const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const MongoHelper = require('./helpers/mongo-helper.js')
const { MissingParamError } = require('../../utils/errors')

describe('LoadUserByEmail Repository', () => {
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

  test('should return null if no user is found', async () => {
    const { sut } = await makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
  test('should return a user if user is found', async () => {
    const { sut, userModel } = await makeSut()
    const insertedFakeUser = await insertFakeUser(userModel)
    const user = await sut.load(makeFakeUser().email)
    expect(user).toEqual({
      _id: insertedFakeUser._id,
      password: insertedFakeUser.password
    })
  })
  test('should throw if no userModel is provided', async () => {
    const sut = new LoadUserByEmailRepository()
    await expect(sut.load(makeFakeUser().email)).rejects.toThrow()
  })
  test('should throw if no email is provided', async () => {
    const { sut } = await makeSut()
    await expect(sut.load()).rejects.toThrow(new MissingParamError('email'))
  })
})

async function makeSut () {
  const userModel = await MongoHelper.getCollection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return { sut, userModel }
}

async function insertFakeUser (userModel) {
  await userModel.insertOne(makeFakeUser())
  const insertedFakeUser = await userModel.findOne({ _id: makeFakeUser()._id })
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
