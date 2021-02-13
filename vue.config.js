module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-form/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/main.scss"; '
      }
    }
  }
}
