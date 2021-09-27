class LoginRoute {
  route (httpRequest) {
    if (!httpRequest.body.email || !httpRequest.body.password) {
      return {
        statusCode: 400
      }
    }
    return { statusCode: 200 }
  }
}

module.exports = LoginRoute
