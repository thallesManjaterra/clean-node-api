class ExpressRouteAdapter {
  static adapt (route) {
    return (req, res) => {
      const httpRequest = {
        body: req.body
      }
      route
        .handle(httpRequest)
        .then(httpResponse => {
          res.status(httpResponse.statusCode).json(httpResponse.body)
        })
    }
  }
}

module.exports = ExpressRouteAdapter
