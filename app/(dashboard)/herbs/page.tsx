'use client';

import { useState } from 'react';
import { herbs } from '@/data/herbs';
import { HerbCard } from '@/components/herbs/HerbCard';
import { Search } from 'lucide-react';

export default function HerbsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(herbs.map(h => h.category)))];

  const filteredHerbs = herbs.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) || 
                          h.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'all' || h.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 overflow-auto p-4 md:p-8 bg-ayur-sage-50/30">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-ayur-green-900">Ayurvedic Herbs</h1>
          <p className="text-muted-foreground mt-2">Explore traditional herbs, their properties, and dosha effects.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search herbs by name or use (e.g., sleep, digestion)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHerbs.map(herb => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
          {filteredHerbs.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No herbs found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
