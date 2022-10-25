/** @type {import('next').NextConfig} */
const commerce = require('./commerce.config.json');

module.exports = {
  commerce,
  unstable_runtimeJS: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,

  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    images: { allowFutureImage: true }
  },
  ignoreBuildErrors: true,

  images: {
    allowFutureImage: true,
    domains: [
      'image/png',
      'image/webp',
      's3-alpha.figma.com',
      'images.pexels.com',
      'cdn.chec.io'
    ]
  }

  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: securityHeaders
  //     }
  //   ];
  // }
};

// const ContentSecurityPolicy = `
//     default-src 'self';
//     script-src 'self'  'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com https://js.stripe.com/v3;
//     child-src *.youtube.com *.google.com *.twitter.com https://js.stripe.com/v3;
//     style-src 'self' 'unsafe-inline' *.googleapis.com;
//     img-src * blob: data: ;
//     media-src 'none';
//     connect-src *;
//     font-src 'self';
// `;

// const securityHeaders = [
//   {
//     key: 'Content-Security-Policy',
//     value: ContentSecurityPolicy.replace(/\n/g, '')
//   },
//   {
//     key: 'Referrer-Policy',
//     value: 'origin-when-cross-origin'
//   },
//   {
//     key: 'X-Frame-Options',
//     value: 'DENY'
//   },
//   {
//     key: 'X-Content-Type-Options',
//     value: 'nosniff'
//   },
//   {
//     key: 'X-DNS-Prefetch-Control',
//     value: 'on'
//   },
//   {
//     key: 'Strict-Transport-Security',
//     value: 'max-age=31536000; includeSubDomains; preload'
//   },
//   {
//     key: 'Permissions-Policy',
//     value: 'camera=(), microphone=(), geolocation=()'
//   }
// ];
