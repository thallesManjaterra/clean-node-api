const UpdateAccessTokenRepository = require('./update-access-token-repository')
const MongoHelper = require('./helpers/mongo-helper.js')

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    const userModel = await MongoHelper.getCollection('users')
    await userModel.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should update the user with the given access token', async () => {
    const userModel = await MongoHelper.getCollection('users')
    const sut = new UpdateAccessTokenRepository(userModel)
    await insertFakeUser(userModel)
    await sut.update('any_id', makeFakeToken())
    const fakeUser = await userModel.findOne({ _id: makeFakeUser()._id })
    expect(fakeUser.accessToken).toBe(makeFakeToken())
  })
})

async function insertFakeUser (userModel) {
  await userModel.insertOne(makeFakeUser())
}

function makeFakeUser () {
  return {
    _id: 'any_id',
    name: 'any_name',
    password: 'hashed_password',
    email: 'any_email@mail.com'
  }
}

function makeFakeToken () {
  return 'any_token'
}
