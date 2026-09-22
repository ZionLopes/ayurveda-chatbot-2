import { NextResponse } from 'next/server';
import { checkEmergency, EMERGENCY_RESPONSE } from '@/lib/safety';

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

// All current available model names to try in order
const MODELS_TO_TRY = [
  'gemini-3.6-flash',
  'gemini-3.6-flash-001',
  'gemini-3.0-flash',
  'gemini-3.0-flash-001',
  'gemini-2.0-flash',
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
];

async function tryGeminiModel(model: string, apiKey: string, geminiMessages: any[], retries = 2): Promise<Response | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        // Wait 1s before retry on 503
        await new Promise(r => setTimeout(r, 1000));
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}&alt=sse`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: AYURVEDA_SYSTEM_PROMPT }]
            },
            contents: geminiMessages,
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              maxOutputTokens: 2048,
            }
          }),
        }
      );

      if (response.status === 503 && attempt < retries) {
        console.log(`Model ${model} got 503, retrying (attempt ${attempt + 1})...`);
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Model ${model} failed (${response.status}):`, errorText.substring(0, 200));
        return null; // try next model
      }

      if (!response.body) return null;

      console.log(`✅ Using model: ${model}`);
      return response;

    } catch (err: any) {
      console.error(`Model ${model} threw:`, err?.message);
    }
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content;

    // Safety check first
    if (checkEmergency(lastMessage)) {
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(EMERGENCY_RESPONSE));
            controller.close();
          }
        }),
        { headers: { 'Content-Type': 'text/plain' } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Try each model until one works
    for (const model of MODELS_TO_TRY) {
      const response = await tryGeminiModel(model, apiKey, geminiMessages);
      if (!response) continue;

      // Stream the response back to the client
      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body!.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6).trim();
                  if (data === '[DONE]') continue;
                  try {
                    const json = JSON.parse(data);
                    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                      controller.enqueue(new TextEncoder().encode(text));
                    }
                  } catch {
                    // skip malformed JSON
                  }
                }
              }
            }
          } catch (err) {
            console.error('Stream read error:', err);
          } finally {
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'X-Model-Used': model,
        },
      });
    }

    // All models failed
    return NextResponse.json(
      { error: 'The AI is currently under high demand. Please try again in a few seconds.' },
      { status: 503 }
    );

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    );
  }
}
