const path = require('path');

const BUILD_DIR = 'public';

module.exports = {
  globDirectory: BUILD_DIR,
  globPatterns: [
    'scripts/*.js',
    'images/**/*.{png,ico}',
    'index.webmanifest',
    'index.html',
  ],
  swDest: path.join(BUILD_DIR, 'service-worker.js'),
  swSrc: path.join(BUILD_DIR, 'service-worker.js'),
};