import { Express, Router } from 'express'
import signupRoutes from '../routes/signup-routes'

export default function setupRoutes (app: Express): void {
  const router = Router()
  app.use('/api', router)
  signupRoutes(router)
}
