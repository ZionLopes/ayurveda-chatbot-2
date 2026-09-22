'use client';

import { useState } from 'react';
import { knowledgeArticles } from '@/data/knowledge';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const filteredArticles = knowledgeArticles.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const selectedArticle = knowledgeArticles.find(a => a.id === selectedArticleId);

  return (
    <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-background h-[calc(100vh-4rem)]">
      
      {/* Article List Sidebar */}
      <div className={`w-full md:w-80 border-r flex flex-col h-full bg-muted/20 ${selectedArticleId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-serif font-bold text-ayur-green-900 mb-4">Knowledge Base</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search concepts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredArticles.map(article => (
            <button
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-colors ${
                selectedArticleId === article.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'
              }`}
            >
              <div>
                <p className="font-medium text-sm line-clamp-1">{article.title}</p>
                <p className={`text-xs capitalize mt-1 ${selectedArticleId === article.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {article.category}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
            </button>
          ))}
          {filteredArticles.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">No articles found.</div>
          )}
        </div>
      </div>

      {/* Article Content Area */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-8 ${!selectedArticleId ? 'hidden md:flex flex-col items-center justify-center' : 'block'}`}>
        {!selectedArticleId ? (
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-ayur-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-ayur-green-900 mb-2">Ayurvedic Wisdom</h2>
            <p className="text-muted-foreground">Select an article from the list to explore traditional Ayurvedic concepts, routines, and philosophy.</p>
          </div>
        ) : !selectedArticle ? null : (
          <div className="max-w-3xl mx-auto space-y-8 pb-12">
            <button 
              onClick={() => setSelectedArticleId(null)}
              className="md:hidden text-primary text-sm font-medium flex items-center mb-4 hover:underline"
            >
              &larr; Back to articles
            </button>
            
            <header className="space-y-4 border-b pb-6">
              <div className="flex items-center gap-2 text-sm text-primary uppercase tracking-wider font-semibold">
                <BookOpen className="h-4 w-4" /> {selectedArticle.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-ayur-green-900">{selectedArticle.title}</h1>
              <p className="text-lg text-muted-foreground italic leading-relaxed">{selectedArticle.overview}</p>
            </header>

            <div className="prose prose-ayur max-w-none text-foreground/90">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedArticle.content}
              </ReactMarkdown>
            </div>

            <div className="bg-ayur-sage-50 rounded-xl p-6 border border-ayur-sage-200 space-y-4 mt-8">
              <h3 className="font-bold text-lg text-ayur-green-900">Traditional Perspective</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{selectedArticle.traditional_perspective}</p>
              
              {selectedArticle.modern_view && (
                <>
                  <h3 className="font-bold text-lg text-ayur-green-900 mt-4">Modern Context</h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selectedArticle.modern_view}</p>
                </>
              )}
            </div>

            {(selectedArticle.precautions || selectedArticle.when_to_consult) && (
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 space-y-4">
                <h3 className="font-bold text-lg text-amber-800">Important Considerations</h3>
                {selectedArticle.precautions && (
                  <p className="text-sm text-amber-900/80">{selectedArticle.precautions}</p>
                )}
                {selectedArticle.when_to_consult && (
                  <p className="text-sm text-amber-900 font-medium">{selectedArticle.when_to_consult}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
