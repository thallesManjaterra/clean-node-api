const LoginRoute = require('../composers/login-route-composer')
const expressRouteAdpater = require('../adapters/express-route-adapter')

module.exports = router => {
  router.post('/login', expressRouteAdpater(LoginRoute))
}
