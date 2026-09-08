import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.ODIVON_BUILD_TARGET === 'static'
  ? { output: 'export' }
  : {};

export default nextConfig;

