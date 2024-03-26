/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  // experimental: {
  //   // Required:
  //   appDir: true,
  // },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
  images: {
    domains: ['admin.kvant.uz'], // Host nomi yoki domainlarni belgilash
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/ru',
      },
    ];
  },
};
