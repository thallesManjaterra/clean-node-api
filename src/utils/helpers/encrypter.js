const bcrypt = require('bcrypt')

class Encrypter {
  compare (value, hash) {
    return bcrypt.compare(value, hash)
  }
}

module.exports = Encrypter
