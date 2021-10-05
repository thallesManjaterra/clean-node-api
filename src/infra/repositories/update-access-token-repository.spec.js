const UpdateAccessTokenRepository = require('./update-access-token-repository')
const MongoHelper = require('../helpers/mongo-helper.js')
const { MissingParamError } = require('../../utils/errors')

describe('UpdateAccessToken Repository', () => {
  let fakeUserId = null

  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  beforeEach(async () => {
    const userModel = await MongoHelper.getCollection('users')
    await userModel.deleteMany({})
    const fakeInsertedUser = await insertFakeUser(userModel)
    fakeUserId = fakeInsertedUser._id
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should update the user with the given access token', async () => {
    const sut = makeSut()
    const userModel = await MongoHelper.getCollection('users')
    await sut.update(fakeUserId, makeFakeToken())
    const fakeUser = await getFakeUser(userModel)
    expect(fakeUser.accessToken).toBe(makeFakeToken())
  })

  test('should throw if no params are provided', async () => {
    const sut = makeSut()
    await expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    await expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})

function makeSut () {
  const sut = new UpdateAccessTokenRepository()
  return sut
}

async function getFakeUser (userModel) {
  return await userModel.findOne()
}

async function insertFakeUser (userModel) {
  await userModel.insertOne(makeFakeUser())
  return await getFakeUser(userModel)
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
