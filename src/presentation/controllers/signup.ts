import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return await Promise.resolve(
        badRequest(new MissingParamError('name'))
      )
    }
    if (!httpRequest.body.email) {
      return await Promise.resolve(
        badRequest(new MissingParamError('email'))
      )
    }
  }
}
