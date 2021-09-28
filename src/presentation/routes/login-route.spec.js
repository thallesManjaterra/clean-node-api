const LoginRoute = require('./login-route')
const MissingParamError = require('../errors/missing-param-error')
const HttpResponse = require('../helpers/http-reponse')

describe('Login Route', () => {
  test('should return 400 when email is not provided ', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpResponse.badRequest(new MissingParamError('email')))
  })
  test('should return 400 when password is not provided ', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpResponse.badRequest(new MissingParamError('password')))
  })
  test('should return 500 when httpRequest is not provided ', () => {
    const { sut } = makeSut()
    const httpResponse = sut.handle()
    expect(httpResponse.statusCode).toBe(500)
  })
  test('should return 500 when httpRequest.body is not provided', () => {
    const { sut } = makeSut()
    const httpResponse = sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
  })
  test('should call AuthUseCase with correct values', () => {
    const { sut, authUseCase } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(authUseCase.email).toBe(httpRequest.body.email)
    expect(authUseCase.password).toBe(httpRequest.body.password)
  })
  test('should return 401 when invalid credentials are provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpResponse.unauthorized())
  })
})

function makeSut () {
  class AuthUseCase {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCase = new AuthUseCase()
  const sut = new LoginRoute(authUseCase)
  return {
    authUseCase,
    sut
  }
}
