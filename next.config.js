/** @type {import('next').NextConfig} */
const commerce = require('./commerce.config.json');

module.exports = {
  commerce,

  images: {
    domains: [
      'image/png',
      'image/webp',
      's3-alpha.figma.com',
      'images.pexels.com',
      'cdn.chec.io'
    ]
  }
};
