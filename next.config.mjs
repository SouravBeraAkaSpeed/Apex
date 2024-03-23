import { withNextVideo } from "next-video/process";
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

export default withNextVideo(nextConfig);