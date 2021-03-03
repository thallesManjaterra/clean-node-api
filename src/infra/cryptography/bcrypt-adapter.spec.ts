import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const HASHED_VALUE = 'hashed_value'
const ANY_VALUE = 'any_value'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve(HASHED_VALUE)
  }
}))

interface SutTypes {
  sut: BcryptAdapter
  salt: number
}

function makeSut (): SutTypes {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return { sut, salt }
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(ANY_VALUE)
    expect(hashSpy).toHaveBeenCalledWith(ANY_VALUE, salt)
  })
  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.encrypt(ANY_VALUE)
    await expect(promise).rejects.toThrow()
  })
  test('should return a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt(ANY_VALUE)
    expect(hash).toBe(HASHED_VALUE)
  })
})
