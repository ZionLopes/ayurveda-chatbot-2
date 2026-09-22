'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const canSubmit = input.trim() && !disabled;

  return (
    <div className="p-4 bg-white border-t border-stone-200">
      <form
        onSubmit={handleSubmit}
        className={cn(
          'max-w-3xl mx-auto flex items-end gap-2 bg-stone-50 border rounded-2xl px-4 py-3 transition-all',
          'focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 focus-within:bg-white'
        )}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about doshas, herbs, Ayurvedic diet, yoga..."
          className="flex-1 resize-none bg-transparent py-0.5 focus:outline-none text-sm text-stone-800 placeholder:text-stone-400 max-h-40"
          rows={1}
          disabled={disabled}
        />
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="submit"
            disabled={!canSubmit}
            className={cn(
              'p-2 rounded-xl transition-all',
              canSubmit
                ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-sm hover:shadow-md hover:from-green-500'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
      <p className="text-center text-[11px] text-stone-400 mt-2">
        AyurVeda AI is for educational purposes · Always verify with a qualified practitioner
      </p>
    </div>
  );
}
