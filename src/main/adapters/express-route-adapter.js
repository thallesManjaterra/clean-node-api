class ExpressRouteAdapter {
  static adapt (route) {
    return (req, res) => {
      const httpRequest = {
        body: req.body
      }
      route
        .handle(httpRequest)
        .then(httpResponse => {
          if (httpResponse !== 200) {
            return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
          }
          res.status(httpResponse.statusCode).json(httpResponse.body)
        })
    }
  }
}

module.exports = ExpressRouteAdapter
