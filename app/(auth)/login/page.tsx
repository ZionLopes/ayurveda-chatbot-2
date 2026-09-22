'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="flex-1 flex min-h-screen">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-900 to-green-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="relative text-center space-y-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/20">
            <Leaf className="h-8 w-8 text-green-300" />
          </div>
          <h2 className="text-4xl font-bold font-serif text-white leading-tight">
            Your Wellness<br />Journey Awaits
          </h2>
          <p className="text-green-200/70 max-w-sm leading-relaxed">
            Explore 5,000 years of Ayurvedic wisdom with the power of modern AI.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-stone-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-900/20">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-serif text-stone-800">Welcome Back</h1>
              <p className="text-stone-500 text-sm mt-1">Sign in to your AyurVeda AI account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700" htmlFor="email">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    id="email" type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700" htmlFor="password">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    id="password" type="password" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-sm transition-all disabled:opacity-60"
              >
                {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="text-center text-sm text-stone-500 mt-6">
              No account?{' '}
              <Link href="/signup" className="text-green-600 font-semibold hover:text-green-700">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
