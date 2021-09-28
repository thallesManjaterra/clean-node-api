const MissingParamError = require('../errors/missing-param-error')
const HttpResponse = require('../helpers/http-reponse')

class LoginRoute {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async handle (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorized()
      }
      return HttpResponse.ok({ token: accessToken })
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}

module.exports = LoginRoute
