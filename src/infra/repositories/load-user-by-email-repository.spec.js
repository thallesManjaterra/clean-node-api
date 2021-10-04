const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const { MongoClient } = require('mongodb')

let connection
let db

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  afterAll(async () => {
    await connection.close()
  })

  test('should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
  test('should return a user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = { _id: 'any_id', name: 'any_name', password: 'hashed_password', email: 'any_email@mail.com' }
    await userModel.insertOne(fakeUser)
    const insertedUser = await userModel.findOne({ _id: 'any_id' })
    const user = await sut.load('any_email@mail.com')
    expect(user).toEqual({
      _id: insertedUser._id,
      password: insertedUser.password
    })
  })
})

function makeSut () {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return { sut, userModel }
}
