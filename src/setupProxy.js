const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://wildlifesearch.org.au/',
      // target: 'http://localhost:9000/',
      changeOrigin: true,
    })
  );
};
