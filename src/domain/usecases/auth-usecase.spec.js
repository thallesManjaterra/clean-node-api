const AuthUseCase = require('./auth-usecase')

describe('Auth Usecase', () => {
  test('should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    expect(sut.auth()).rejects.toThrow()
  })
})
