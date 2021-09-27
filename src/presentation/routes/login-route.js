class LoginRoute {
  route (httpRequest) {
    const { email, password } = httpRequest
    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
    return { statusCode: 200 }
  }
}

module.exports = LoginRoute
