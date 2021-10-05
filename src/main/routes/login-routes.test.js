const request = require('supertest')
const MongoHelper = require('../../infra/helpers/mongo-helper')
const app = require('../config/app')
const env = require('../config/env')
const bcrypt = require('bcrypt')

let userModel = null
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
    userModel = await MongoHelper.getCollection('users')
  })
  beforeEach(async () => {
    await userModel.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should return 200 when valid credentials are provided', async () => {
    const fakeUser = makeFakeUser()
    const fakeUserWithHashedPassword = {
      ...fakeUser,
      password: await bcrypt.hash(fakeUser.password, 10)
    }
    await insertFakeUser(fakeUserWithHashedPassword)
    const fakeUserData = {
      email: fakeUser.email,
      password: fakeUser.password
    }
    await request(app)
      .post('/api/login')
      .send(fakeUserData)
      .expect(200)
  })
})

async function insertFakeUser (fakeUser) {
  await userModel.insertOne(fakeUser)
  const insertedFakeUser = await userModel.findOne({ _id: fakeUser._id })
  return insertedFakeUser
}

function makeFakeUser () {
  return {
    _id: 'any_id',
    name: 'any_name',
    password: 'hashed_password',
    email: 'any_email@mail.com'
  }
}
