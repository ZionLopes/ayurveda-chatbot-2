import { MessageRole } from '@/types';
import { Leaf, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  isStreaming?: boolean;
}

export function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isAssistant = role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex gap-3 w-full group', isAssistant ? 'justify-start' : 'justify-end')}>
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Leaf className="h-4 w-4 text-white" />
        </div>
      )}

      <div className={cn(
        'max-w-[80%] rounded-2xl px-5 py-3.5 text-sm shadow-sm',
        isAssistant
          ? 'bg-white border border-stone-100 text-stone-800'
          : 'bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-tr-sm'
      )}>
        {isAssistant ? (
          <div className="min-w-0">
            <div className="prose prose-sm max-w-none prose-headings:text-green-800 prose-headings:font-semibold prose-strong:text-green-700 prose-ul:my-1 prose-li:my-0.5 prose-p:my-1.5 prose-blockquote:border-amber-400 prose-code:bg-green-50 prose-code:text-green-800 prose-code:px-1 prose-code:rounded">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
            {isStreaming && (
              <span className="inline-flex gap-1 items-center h-4 ml-1 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full dot-1"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full dot-2"></span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full dot-3"></span>
              </span>
            )}
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        )}
      </div>

      {isAssistant && !isStreaming && content && (
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-2 p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100"
          title="Copy response"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      )}

      {!isAssistant && (
        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center shrink-0 mt-0.5">
          <User className="h-4 w-4 text-stone-500" />
        </div>
      )}
    </div>
  );
}
