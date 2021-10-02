const jwt = require('jsonwebtoken')

class TokenGenerator {
  constructor (secretKey) {
    this.secretKey = secretKey
  }

  generate (id) {
    const token = jwt.sign(id, this.secretKey)
    return token
  }
}

module.exports = TokenGenerator
