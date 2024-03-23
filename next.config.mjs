/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'hunzgvrvpuklmrhimmsk.supabase.co',
             
            },
        ]
    }
};

export default nextConfig;
