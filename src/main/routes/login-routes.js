const LoginRouteComposer = require('../composers/login-route-composer')
const { adapt } = require('../adapters/express-route-adapter')

module.exports = router => {
  const loginRoute = LoginRouteComposer.compose()
  router.post('/login', adapt(loginRoute))
}
