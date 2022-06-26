import getConfig from 'next/config';
import { createProxyMiddleware } from 'http-proxy-middleware';

import middleware from './middleware';

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

const proxyMiddleware = (token?: string) =>
  middleware(
    createProxyMiddleware({
      pathRewrite: { [`^/api`]: '' },
      logLevel: process.env.NODE_ENV === 'production' ? 'debug' : 'warn',
      target: baseUrl,
      changeOrigin: true,
      secure: false,
      onProxyReq: function onProxyReq(proxyReq) {
        if (token) {
          proxyReq.setHeader('Authorization', `Bearer ${token}`);
        }
      },
    })
  );

export default proxyMiddleware;
