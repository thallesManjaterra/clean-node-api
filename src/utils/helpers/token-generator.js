const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors')

class TokenGenerator {
  constructor (secretKey) {
    this.secretKey = secretKey
  }

  generate (id) {
    if (!this.secretKey) {
      throw new MissingParamError('secretKey')
    }
    const token = jwt.sign(id, this.secretKey)
    return token
  }
}

module.exports = TokenGenerator
