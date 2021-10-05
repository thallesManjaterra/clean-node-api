const LoginRoute = require('../../presentation/routes/login-route')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const env = require('../config/env')

class LoginRouteComposer {
  static compose () {
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const encrypter = new Encrypter()
    const tokenGenerator = new TokenGenerator(env.secretKey)
    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository, updateAccessTokenRepository, encrypter, tokenGenerator
    })
    const emailValidator = new EmailValidator()
    const loginRoute = new LoginRoute({ authUseCase, emailValidator })
    return loginRoute
  }
}

module.exports = LoginRouteComposer
