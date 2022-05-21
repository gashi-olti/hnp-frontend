const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  serverRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
  env: {
    BUILD_ENV: process.env.BUILD_ENV,
  },
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false };

    return config;
  },
};
