import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

function makeFakeRequest (): HttpRequest {
  return {
    body: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

function makeFakeHttpResponse (): HttpResponse {
  return { statusCode: 200, body: {} }
}

function makeController (): Controller {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await Promise.resolve(makeFakeHttpResponse())
    }
  }
  return new ControllerStub()
}

function makeSut (): SutTypes {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
  test('should return the same as controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(makeFakeHttpResponse())
  })
})
