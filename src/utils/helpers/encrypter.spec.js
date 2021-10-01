const Encrypter = require('./encrypter')
const bcrypt = require('bcrypt')
const { MissingParamError } = require('../errors')

describe('Encrypter', () => {
  test('should return true if bcrypt.compare returns true', async () => {
    const sut = makeSut()
    const isValuesMatch = await sut.compare('any_value', 'hashed_value')
    expect(isValuesMatch).toBe(true)
  })
  test('should return false if bcrypt.compare returns false', async () => {
    const sut = makeSut()
    bcrypt.compare.mockResolvedValueOnce(false)
    const isValuesMatch = await sut.compare(
      'any_value',
      'hashed_of_another_value'
    )
    expect(isValuesMatch).toBe(false)
  })
  test('should call bcrypt.compare with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'any_value',
      'hashed_of_another_value'
    )
  })
  test('should throw if no value is provided', async () => {
    const sut = makeSut()
    await expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
  })
  test('should throw if no hash is provided', async () => {
    const sut = makeSut()
    await expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
  })
})

function makeSut () {
  const sut = new Encrypter()
  return sut
}
