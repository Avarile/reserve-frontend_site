const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://13.211.212.227:9006/',
      target: 'http://localhost:9000/',
      changeOrigin: true,
    })
  );
};
