'use client';

import { useState } from 'react';
import { foods } from '@/data/foods';
import { FoodCard } from '@/components/foods/FoodCard';
import { Search } from 'lucide-react';
import { DoshaType } from '@/types';

export default function FoodsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [doshaFilter, setDoshaFilter] = useState<DoshaType | 'all'>('all');

  const categories = ['all', ...Array.from(new Set(foods.map(f => f.category)))];

  const filteredFoods = foods.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || f.category === category;
    const matchesDosha = doshaFilter === 'all' || f.dosha_effect[doshaFilter] === 'good';
    return matchesSearch && matchesCategory && matchesDosha;
  });

  return (
    <div className="flex-1 overflow-auto p-4 md:p-8 bg-ayur-sage-50/30">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-ayur-green-900">Ayurvedic Foods</h1>
          <p className="text-muted-foreground mt-2">Discover foods and spices beneficial for your constitution.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search foods..." 
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

          <select 
            value={doshaFilter}
            onChange={(e) => setDoshaFilter(e.target.value as DoshaType | 'all')}
            className="px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Doshas</option>
            <option value="vata">Good for Vata</option>
            <option value="pitta">Good for Pitta</option>
            <option value="kapha">Good for Kapha</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
          {filteredFoods.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No foods found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
