'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatInput } from '@/components/chat/ChatInput';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { Sidebar } from '@/components/chat/Sidebar';
import { Leaf, Sparkles, Activity, BookOpen, Sprout } from 'lucide-react';
import { ChatMessage } from '@/types';

const SUGGESTED_PROMPTS = [
  { icon: Activity, label: 'What is my Dosha?', prompt: 'How do I find out my Ayurvedic dosha (Prakriti)?' },
  { icon: Leaf, label: 'Ayurvedic diet tips', prompt: 'What are the basic principles of an Ayurvedic diet?' },
  { icon: Sprout, label: 'About Ashwagandha', prompt: 'Tell me about Ashwagandha — its traditional uses and safety.' },
  { icon: BookOpen, label: 'Morning routine', prompt: 'What is Dinacharya and how do I follow an Ayurvedic morning routine?' },
];

function ChatContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && messages.length === 0) {
      handleSend(q);
    }
  }, [searchParams]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || `HTTP ${response.status}`);
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      // Only add the assistant message once we start getting content
      let assistantAdded = false;
      let streamed = '';
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          streamed += decoder.decode(value, { stream: true });
          if (!assistantAdded) {
            assistantAdded = true;
            setMessages((prev) => [...prev, { role: 'assistant', content: streamed }]);
          } else {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: streamed };
              return updated;
            });
          }
        }
      }

      // If stream closed with no content, remove the user message too so history stays clean
      if (!assistantAdded) {
        setMessages((prev) => prev.slice(0, -1));
        throw new Error('The AI returned an empty response. Please try again.');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      // Remove any partial assistant message that may have been added
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content) return prev.slice(0, -1);
        return [...prev, { role: 'assistant', content: `⚠️ **Error:** ${error.message || 'Could not connect to the AI. Please try again.'}` }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 bg-stone-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 p-6 max-w-2xl mx-auto">
              {/* Welcome */}
              <div className="space-y-3">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-green-900/20">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold font-serif text-stone-800">
                  Namaste! 🙏
                </h1>
                <p className="text-stone-500 leading-relaxed">
                  I&apos;m AyurVeda AI, your guide to Ayurvedic wellness. Ask me about doshas, herbs, diet, yoga, or traditional practices.
                </p>
              </div>

              {/* Suggested prompts grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {SUGGESTED_PROMPTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.prompt}
                      onClick={() => handleSend(item.prompt)}
                      className="flex items-center gap-3 p-4 bg-white border border-stone-200 rounded-xl text-left hover:border-green-300 hover:shadow-sm hover:bg-green-50/50 transition-all group"
                    >
                      <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                        <Icon className="h-4 w-4 text-green-700" />
                      </div>
                      <span className="text-sm font-medium text-stone-700 group-hover:text-green-800">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={idx}
                  role={msg.role}
                  content={msg.content}
                  isStreaming={isLoading && idx === messages.length - 1 && msg.role === 'assistant'}
                />
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shrink-0">
                    <Leaf className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white border border-stone-100 rounded-2xl px-5 py-4 shadow-sm">
                    <span className="inline-flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full dot-1"></span>
                      <span className="w-2 h-2 bg-green-500 rounded-full dot-2"></span>
                      <span className="w-2 h-2 bg-green-500 rounded-full dot-3"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>}>
      <ChatContent />
    </Suspense>
  );
}
