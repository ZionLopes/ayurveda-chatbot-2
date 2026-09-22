import Link from 'next/link';
import { Leaf, Sparkles, BookOpen, Activity, ArrowRight, Shield, Globe, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-stone-900">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-700/5 rounded-full blur-3xl" />

        <div className="relative container px-4 md:px-6 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-800/40 border border-green-600/30 text-green-300 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Leaf className="h-3.5 w-3.5" />
            AI-Powered Ayurveda Wellness
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight font-serif">
            Your Personal
            <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              Ayurveda Guide
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-green-100/70 leading-relaxed">
            Explore the ancient wisdom of Ayurveda through AI. Discover your dosha, explore healing herbs, and receive personalised wellness guidance rooted in 5,000-year-old tradition.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/chat"
              className="group inline-flex items-center justify-center gap-2 h-14 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-green-900/50 transition-all duration-300 text-base"
            >
              Start Chatting
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dosha"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 text-base"
            >
              <Activity className="h-5 w-5" />
              Find Your Dosha
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-green-200/50 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Educational Use Only</span>
            <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> Based on AYUSH Guidelines</span>
            <span className="flex items-center gap-2"><Heart className="h-4 w-4" /> 5,000 Years of Wisdom</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-green-900 mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A complete Ayurvedic wellness companion at your fingertips</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'AI Chat',
                desc: 'Ask anything about Ayurveda, herbs, diet and wellness. Get instant, responsible guidance.',
                color: 'from-violet-500 to-purple-500',
                bg: 'bg-violet-50',
                href: '/chat'
              },
              {
                icon: Activity,
                title: 'Dosha Quiz',
                desc: 'Discover your Prakriti — your unique mind-body constitution according to Ayurveda.',
                color: 'from-orange-500 to-amber-500',
                bg: 'bg-orange-50',
                href: '/dosha'
              },
              {
                icon: Leaf,
                title: 'Herb Explorer',
                desc: 'Browse a curated Ayurvedic herb library with benefits, uses, and safety information.',
                color: 'from-green-500 to-emerald-500',
                bg: 'bg-green-50',
                href: '/herbs'
              },
              {
                icon: BookOpen,
                title: 'Knowledge Base',
                desc: 'Learn Ayurvedic concepts, daily routines (Dinacharya), diet principles and more.',
                color: 'from-blue-500 to-cyan-500',
                bg: 'bg-blue-50',
                href: '/knowledge'
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Link key={i} href={feature.href} className="group">
                  <div className="h-full bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-5 shadow-sm`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-stone-800 mb-2 group-hover:text-green-700 transition-colors">{feature.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOSHA PREVIEW ── */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-green-900 mb-4">The Three Doshas</h2>
              <p className="text-muted-foreground">Ayurveda recognizes three fundamental bio-energies that govern all biological and psychological functions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Vata', emoji: '🌬️', elements: 'Air + Space', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50 border-blue-200', traits: ['Creative', 'Enthusiastic', 'Quick Thinking'] },
                { name: 'Pitta', emoji: '🔥', elements: 'Fire + Water', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50 border-orange-200', traits: ['Ambitious', 'Sharp intellect', 'Transformative'] },
                { name: 'Kapha', emoji: '🌊', elements: 'Earth + Water', color: 'from-green-500 to-teal-500', bg: 'bg-green-50 border-green-200', traits: ['Nurturing', 'Stable', 'Enduring strength'] },
              ].map((dosha, i) => (
                <div key={i} className={`rounded-2xl border p-6 ${dosha.bg}`}>
                  <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${dosha.color} items-center justify-center text-2xl mb-4`}>
                    {dosha.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-1">{dosha.name}</h3>
                  <p className="text-sm text-stone-500 mb-4">{dosha.elements}</p>
                  <ul className="space-y-1.5">
                    {dosha.traits.map((t, j) => (
                      <li key={j} className="text-sm text-stone-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/dosha"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-md"
              >
                Take the Dosha Quiz <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-900">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">Begin Your Wellness Journey</h2>
          <p className="text-green-200/80 mb-8 max-w-md mx-auto">Join AyurVeda AI and explore the ancient science of holistic living.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors shadow-lg">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="bg-stone-100 border-t py-4 px-4 text-center text-xs text-stone-500">
        <strong>Disclaimer:</strong> AyurVeda AI provides general educational information only and does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.
      </div>
    </div>
  );
}
