'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Leaf, MessageCircle, Activity, Sprout, Apple, BookOpen, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Explorer';

  const cards = [
    {
      title: 'Chat with AI',
      icon: MessageCircle,
      href: '/chat',
      desc: 'Ask anything about Ayurveda, wellness and traditional remedies.',
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50 hover:bg-violet-100',
      border: 'border-violet-200',
    },
    {
      title: 'Dosha Assessment',
      icon: Activity,
      href: '/dosha',
      desc: 'Discover your unique Ayurvedic constitution (Prakriti).',
      gradient: 'from-orange-500 to-amber-500',
      bg: 'bg-orange-50 hover:bg-orange-100',
      border: 'border-orange-200',
    },
    {
      title: 'Herb Explorer',
      icon: Sprout,
      href: '/herbs',
      desc: 'Browse traditional Ayurvedic herbs and their healing properties.',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50 hover:bg-green-100',
      border: 'border-green-200',
    },
    {
      title: 'Ayurvedic Foods',
      icon: Apple,
      href: '/foods',
      desc: 'Explore foods that balance your dosha and support wellbeing.',
      gradient: 'from-red-500 to-rose-500',
      bg: 'bg-red-50 hover:bg-red-100',
      border: 'border-red-200',
    },
    {
      title: 'Knowledge Base',
      icon: BookOpen,
      href: '/knowledge',
      desc: 'Learn Ayurvedic concepts, daily routines and philosophy.',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50 hover:bg-blue-100',
      border: 'border-blue-200',
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-stone-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="h-5 w-5 text-green-400" />
              <span className="text-green-300 text-sm font-medium">AyurVeda AI Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
              Namaste, {userName}! 🙏
            </h1>
            <p className="text-green-100/70 max-w-lg leading-relaxed">
              Welcome to your personal Ayurveda wellness space. Explore ancient wisdom, discover your constitution, and start your wellness journey.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div>
          <h2 className="text-lg font-semibold text-stone-700 mb-4">Explore Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <Link key={i} href={card.href} className="group">
                  <div className={`h-full bg-white border ${card.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${card.gradient} mb-4 shadow-sm`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-1.5 group-hover:text-green-700 transition-colors">{card.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{card.desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-green-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
