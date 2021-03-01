import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('should call encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (_value: string): Promise<string> {
        return await Promise.resolve('hash_value')
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
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
