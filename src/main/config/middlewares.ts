import { Express } from 'express'
import { bodyParser } from '../middlewares/body_parser'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'

export default function setupMiddlewares (app: Express): void {
  app
    .use(bodyParser)
    .use(cors)
    .use(contentType)
}
