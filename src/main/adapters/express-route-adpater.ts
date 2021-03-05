import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export function adaptRoute (controller: Controller) {
  return (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    controller.handle(httpRequest)
      .then(({ statusCode, body }: HttpResponse) => {
        res
          .status(statusCode)
          .json(statusCode === 200
            ? body
            : errorMessage()
          )
        function errorMessage (): { error: string } {
          return { error: body.message }
        }
      })
      .catch(console.error)
  }
}
