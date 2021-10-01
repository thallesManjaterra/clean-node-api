const Encrypter = require('./encrypter')
const bcrypt = require('bcrypt')

describe('Encrypter', () => {
  test('should return true if bcrypt.compare returns true', async () => {
    const sut = new Encrypter()
    const isValuesMatch = await sut.compare('any_value', 'hashed_value')
    expect(isValuesMatch).toBe(true)
  })
  test('should return false if bcrypt.compare returns false', async () => {
    const sut = new Encrypter()
    bcrypt.compare.mockResolvedValueOnce(false)
    const isValuesMatch = await sut.compare('any_value', 'hashed_of_another_value')
    expect(isValuesMatch).toBe(false)
  })
})
