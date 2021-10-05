const LoginRouter = require('../../presentation/routes/login-route')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')

module.exports = router => {
  const authUsecase = new AuthUseCase()
  const emailValidator = new EmailValidator()
  const loginRouter = new LoginRouter(authUsecase, emailValidator)
  router.post('/login', loginRouter)
}
