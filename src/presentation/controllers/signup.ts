export class SignUpController {
  async handle (httpRequest: any): Promise<any> {
    return await Promise.resolve({
      statusCode: 400,
      body: new Error('Missing param: name')
    })
  }
}
