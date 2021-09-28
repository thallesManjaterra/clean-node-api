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
    const { sut, authUseCaseMock } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const { email, password } = httpRequest.body
    sut.handle(httpRequest)
    expect(authUseCaseMock.auth).toHaveBeenCalledWith(email, password)
  })
  test('should return 401 when AuthUseCase returns null', () => {
    const { sut, authUseCaseMock } = makeSut()
    authUseCaseMock.auth.mockReturnValueOnce(null)
    const httpRequest = {
      body: {
        email: 'invalid_email@mail.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpResponse.unauthorized())
  })
  test('should return 500 when AuthUseCase is not provided', () => {
    const sut = new LoginRoute()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpResponse.serverError())
  })
  test('should return 500 when AuthUseCase.auth is not provided', () => {
    const sut = new LoginRoute({})
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpResponse.serverError())
  })
  test('should return 200 when AuthUseCase returns an access token', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(HttpResponse.ok())
  })
})

function makeSut () {
  const authUseCaseMock = {
    auth: jest.fn().mockReturnValue('any_token')
  }
  const sut = new LoginRoute(authUseCaseMock)
  return {
    authUseCaseMock,
    sut
  }
}
