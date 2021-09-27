class HttpResponse {
  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

module.exports = HttpResponse
