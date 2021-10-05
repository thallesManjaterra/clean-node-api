const UpdateAccessTokenRepository = require('./update-access-token-repository')
const MongoHelper = require('./helpers/mongo-helper.js')
const { MissingParamError } = require('../../utils/errors')

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
    const { sut, userModel } = await makeSut()
    const fakeInsertedUser = await insertFakeUser(userModel)
    await sut.update(fakeInsertedUser._id, makeFakeToken())
    const fakeUser = await userModel.findOne({ _id: makeFakeUser()._id })
    expect(fakeUser.accessToken).toBe(makeFakeToken())
  })
  test('should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = await MongoHelper.getCollection('users')
    const fakeInsertedUser = await insertFakeUser(userModel)
    await expect(sut.update(fakeInsertedUser._id, makeFakeToken())).rejects.toThrow()
  })
  test('should throw if no params are provided', async () => {
    const { sut, userModel } = await makeSut()
    await expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    const fakeInsertedUser = await insertFakeUser(userModel)
    await expect(sut.update(fakeInsertedUser._id)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})

async function makeSut () {
  const userModel = await MongoHelper.getCollection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return { sut, userModel }
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
