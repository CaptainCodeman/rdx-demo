const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');
const logger = require('connect-logger');
const compression = require('compression');

browserSync.init({
  cwd: 'public',
  server: {
    baseDir: 'public',
    index: 'index.html',
    routes: {
      '/node_modules': 'node_modules',
      '/src': 'src',
    }
  },
  files: [
    'scripts/**',
    'index.html',
  ],
  middleware: [
    logger(),
    compression({ level: 9 }),
    historyApiFallback(),
  ],
});
