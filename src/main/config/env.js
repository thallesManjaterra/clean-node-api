module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-js-api',
  secretKey: process.env.SECRET_KEY || 'secret',
  port: process.env.PORT || 5858
}
