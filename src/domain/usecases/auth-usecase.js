const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  constructor ({ loadUserByEmailRepository, encrypter, tokenGenerator } = {}) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    const user = await this.loadUserByEmailRepository.load(email)
    const thereIsTheUserAndPasswordIsValid = user && this.encrypter.compare(password, user.password)
    if (thereIsTheUserAndPasswordIsValid) {
      const accessToken = this.tokenGenerator.generate(user.id)
      return accessToken
    }
    return null
  }
}

module.exports = AuthUseCase
