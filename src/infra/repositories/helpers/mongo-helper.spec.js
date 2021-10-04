const MongoHelper = require('./mongo-helper')

describe('Mongo Helper', () => {
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should reconnect when getCollection is invoked and client is disconnected', async () => {
    const sut = MongoHelper
    await sut.connect(global.__MONGO_URI__)
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
    expect(sut.db).toBeNull()
    await sut.getCollection('users')
    expect(sut.db).toBeTruthy()
  })
})
