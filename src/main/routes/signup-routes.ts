import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adpater'
import { makeSignUpController } from '../factories/signup'

export default function (router: Router): void {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
