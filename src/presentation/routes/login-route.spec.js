const LoginRoute = require('./login-route')

describe('Login Route', () => {
  test('should return 400 when email is not provided ', () => {
    const sut = new LoginRoute()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
