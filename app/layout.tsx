import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({ weight: ['300', '400', '700'], subsets: ['latin'], variable: '--font-merriweather' });

export const metadata: Metadata = {
  title: 'AyurVeda AI - Your Wellness Companion',
  description: 'AI-powered Ayurveda wellness assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
