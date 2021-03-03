import { Request, Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export function adaptRoute (controller: Controller) {
  return (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    controller.handle(httpRequest)
      .then((httpResponse: HttpResponse) => {
        res
          .status(httpResponse.statusCode)
          .json(httpResponse.body)
      })
      .catch(console.error)
  }
}
