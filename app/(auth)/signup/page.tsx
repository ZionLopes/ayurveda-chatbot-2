'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Leaf, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error, data } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } }
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    if (data?.user) {
      await supabase.from('users').insert({ id: data.user.id, email, name, role: 'user', language: 'en' }).select();
    }

    if (!data.session) {
      setMessage({ type: 'success', text: '✅ Account created! Check your email to confirm, then sign in.' });
      setLoading(false);
      return;
    }

    window.location.href = '/dashboard';
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
            Begin Your<br />Wellness Journey
          </h2>
          <p className="text-green-200/70 max-w-sm leading-relaxed">
            Join thousands discovering Ayurvedic wellness with the help of AI.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {['Discover your Dosha', 'Explore healing herbs', 'Get wellness guidance', 'Ayurvedic daily routines'].map(f => (
              <div key={f} className="flex items-center gap-3 text-green-200/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {f}
              </div>
            ))}
          </div>
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
              <h1 className="text-2xl font-bold font-serif text-stone-800">Create Account</h1>
              <p className="text-stone-500 text-sm mt-1">Join AyurVeda AI — it&apos;s free</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {message && (
                <div className={`border text-sm p-3 rounded-xl ${message.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
                  {message.text}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Jane Doe" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="you@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Min. 6 characters" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-sm transition-all mt-2 disabled:opacity-60">
                {loading ? 'Creating Account...' : <><span>Create Account</span><ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="text-center text-sm text-stone-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 font-semibold hover:text-green-700">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
