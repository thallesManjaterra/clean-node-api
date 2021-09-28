const MissingParamError = require('../errors/missing-param-error')
const HttpResponse = require('../helpers/http-reponse')

class LoginRoute {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  handle (httpRequest) {
    if (!httpRequest?.body || !this.authUseCase?.auth) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest(new MissingParamError('email'))
    }
    if (!password) {
      return HttpResponse.badRequest(new MissingParamError('password'))
    }
    this.authUseCase.auth(email, password)
    return HttpResponse.unauthorized()
  }
}

module.exports = LoginRoute
