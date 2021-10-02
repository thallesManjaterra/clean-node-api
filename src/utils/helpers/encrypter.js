const bcrypt = require('bcrypt')
const { MissingParamError } = require('../errors')

class Encrypter {
  async compare (value, hash) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hash) {
      throw new MissingParamError('hash')
    }
    const isValueAndHashMatches = await bcrypt.compare(value, hash)
    return isValueAndHashMatches
  }
}

module.exports = Encrypter
