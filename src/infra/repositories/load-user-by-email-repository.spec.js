const LoadUserByEmailRepository = require('./load-user-by-email-repository')

describe('LoadUserByEmail Repository', () => {
  test('should return null if no user is found', async () => {
    const sut = new LoadUserByEmailRepository()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
})
