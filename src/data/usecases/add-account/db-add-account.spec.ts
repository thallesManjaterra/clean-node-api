import { DbAddAccount } from './db-add-account'
import { AddAccountModel, Encrypter } from './db-add-account-protocols'

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

function makeFakeAccountData (): AddAccountModel {
  return {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
}

describe('DbAddAccount Usecase', () => {
  test('should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenLastCalledWith(makeFakeAccountData().password)
  })
  test('should throws if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValue(new Error())
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })
})
