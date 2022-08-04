module.exports = {
  partialBundledLanguages: true,
  i18n: {
    defaultLocale: 'sq',
    locales: ['sq', 'en'],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV !== 'production' ? true : false,
  debug: +process.env.DEBUG_MODE && process.env.NODE_ENV !== 'production' ? true : false,
};
