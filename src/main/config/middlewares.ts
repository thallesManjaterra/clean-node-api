import { Express } from 'express'
import { bodyParser } from '../middlewares/body_parser'

export default function setupMiddlewares (app: Express): void {
  app.use(bodyParser)
}
