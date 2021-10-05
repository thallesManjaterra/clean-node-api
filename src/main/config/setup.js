module.exports = (app) => {
  app.disable('x-powered-by')
  app.use((req, res, next) => {
    res
      .set('access-control-allow-origin', '*')
      .set('access-control-allow-methods', '*')
      .set('access-control-allow-headers', '*')
    next()
  })
}
