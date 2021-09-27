const MissingParamError = require('../errors/missing-param-error')
const HttpResponse = require('../helpers/http-reponse')

class LoginRoute {
  route (httpRequest) {
    if (!httpRequest?.body) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest(new MissingParamError('email'))
    }
    if (!password) {
      return HttpResponse.badRequest(new MissingParamError('password'))
    }
  }
}

module.exports = LoginRoute
