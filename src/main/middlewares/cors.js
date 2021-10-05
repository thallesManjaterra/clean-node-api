module.exports = (req, res, next) => {
  res
    .set('access-control-allow-origin', '*')
    .set('access-control-allow-methods', '*')
    .set('access-control-allow-headers', '*')
  next()
}
