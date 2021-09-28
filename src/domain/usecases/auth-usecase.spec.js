const AuthUseCase = require('./auth-usecase')
const { MissingParamError } = require('../../utils/errors')

describe('Auth Usecase', () => {
  test('should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    expect(sut.auth()).rejects.toThrow(new MissingParamError('email'))
  })
  test('should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    expect(sut.auth('any_email@mail.com')).rejects.toThrow(new MissingParamError('password'))
  })
})
