import { checkEmergency, EMERGENCY_RESPONSE } from '@/lib/safety';

export const runtime = 'edge';

const AYURVEDA_SYSTEM_PROMPT = `You are AyurVeda AI, a friendly and knowledgeable Ayurvedic wellness assistant. You provide educational information about Ayurveda — the ancient Indian science of life.

You can help with:
- Explaining the three doshas: Vata, Pitta, and Kapha
- Ayurvedic herbs and their traditional uses (Ashwagandha, Turmeric, Tulsi, etc.)
- Ayurvedic diet and food guidelines
- Daily routines (Dinacharya) and seasonal routines (Ritucharya)
- Yoga, meditation, and breathing practices
- Traditional Ayurvedic therapies and concepts
- General wellness and lifestyle guidance

IMPORTANT RULES:
1. Always remind users that you provide educational information only — not medical advice.
2. Never diagnose diseases or conditions.
3. Never tell users to stop or modify prescribed medications.
4. For serious symptoms or emergencies, always recommend seeking immediate medical care.
5. Clearly distinguish between traditional Ayurvedic perspectives and modern medical evidence.
6. Mention safety precautions when discussing herbs or supplements.
7. Be warm, friendly, and encouraging.
8. Use relevant emojis to make responses engaging 🌿

Always respond in a clear, friendly, and educational manner using Markdown formatting.`;

// Only try the one model that is confirmed working
// Add fallbacks in order — edge runtime can't use setTimeout so no retries
const MODELS_TO_TRY = [
  'gemini-3.6-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastMessage = messages[messages.length - 1].content;

    // Safety check first
    if (checkEmergency(lastMessage)) {
      return new Response(EMERGENCY_RESPONSE, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Filter out error messages and empty assistant turns — Gemini rejects
    // conversations where a model turn has no text (e.g. from previous failures)
    const cleanMessages = messages.filter((msg: any) => {
      if (msg.role === 'user') return true;
      const text: string = msg.content || '';
      return text.trim().length > 0 && !text.startsWith('⚠️');
    });

    if (cleanMessages.length === 0 || cleanMessages[cleanMessages.length - 1].role !== 'user') {
      return new Response(JSON.stringify({ error: 'No valid user message found.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const geminiMessages = cleanMessages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const requestBody = JSON.stringify({
      system_instruction: {
        parts: [{ text: AYURVEDA_SYSTEM_PROMPT }],
      },
      contents: geminiMessages,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // Try each model until one responds successfully
    for (const model of MODELS_TO_TRY) {
      let geminiResponse: Response;
      try {
        geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody,
          }
        );
      } catch (fetchErr: any) {
        console.error(`Fetch failed for ${model}:`, fetchErr.message);
        continue;
      }

      if (!geminiResponse.ok || !geminiResponse.body) {
        const errText = await geminiResponse.text().catch(() => '');
        console.error(`Model ${model} returned ${geminiResponse.status}:`, errText.slice(0, 300));
        continue;
      }

      // Model responded OK — pipe its SSE body through a transform stream
      const reader = geminiResponse.body.getReader();
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const stream = new ReadableStream({
        async pull(controller) {
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              return;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6).trim();
              if (!data || data === '[DONE]') continue;
              try {
                const json = JSON.parse(data);
                const text: string | undefined =
                  json?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              } catch {
                // skip malformed SSE chunk
              }
            }
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Model-Used': model,
        },
      });
    }

    // All models failed
    return new Response(
      JSON.stringify({ error: 'The AI is currently under high demand. Please try again in a few seconds.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
