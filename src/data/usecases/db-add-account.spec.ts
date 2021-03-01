import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

function makeEncrypter (): Encrypter {
  class EncrypterStub implements Encrypter {
    async encrypt (_value: string): Promise<string> {
      return await Promise.resolve('hash_value')
    }
  }
  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

function makeSut (): SutTypes {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return { sut, encrypterStub }
}

describe('DbAddAccount Usecase', () => {
  test('should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenLastCalledWith(accountData.password)
  })
})
