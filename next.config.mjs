/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'htlauuixpwujpffsyzpx.supabase.co' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@google/genai'],
  },
};

export default nextConfig;
