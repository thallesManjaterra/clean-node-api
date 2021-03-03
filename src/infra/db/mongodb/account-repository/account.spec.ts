import { AddAccountModel } from '../../../../domain/usescases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

function makeFakeAccountData (): AddAccountModel {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'hashed_password'
  }
}

function makeSut (): AccountMongoRepository {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccountData())
    const accountData = makeFakeAccountData()
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(accountData.name)
    expect(account.email).toBe(accountData.email)
    expect(account.password).toBe(accountData.password)
  })
})
