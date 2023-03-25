const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://34.64.105.72:8000',
      changeOrigin: true,
    })
  );
};
