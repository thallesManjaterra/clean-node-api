export class SignUpController {
  async handle (httpRequest: any): Promise<any> {
    if (!httpRequest.body.name) {
      return await Promise.resolve({
        statusCode: 400,
        body: new Error('Missing param: name')
      })
    }
    if (!httpRequest.body.email) {
      return await Promise.resolve({
        statusCode: 400,
        body: new Error('Missing param: email')
      })
    }
  }
}
