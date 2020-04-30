module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Mega-Map-dev/' : '/',
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
