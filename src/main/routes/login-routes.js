const LoginRoute = require('../composers/login-route-composer')

module.exports = router => {
  router.post('/login', LoginRoute)
}
