module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/mega-map-dev/' : '/',
  // publicPath: '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
