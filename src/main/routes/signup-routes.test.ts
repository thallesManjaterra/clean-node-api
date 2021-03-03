import request from 'supertest'
import app from '../config/app'

function makeFakeAccountData (): any {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
}

describe('SignUp Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send(makeFakeAccountData())
      .expect(200)
  })
})
