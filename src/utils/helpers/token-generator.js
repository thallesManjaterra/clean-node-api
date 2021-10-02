const jwt = require('jsonwebtoken')

class TokenGenerator {
  generate (id) {
    const token = jwt.sign(id, 'secret_key')
    return token
  }
}

module.exports = TokenGenerator
