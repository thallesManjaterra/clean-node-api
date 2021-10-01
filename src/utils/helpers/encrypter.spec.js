const Encrypter = require('./encrypter')

describe('Encrypter', () => {
  describe('bcrypt.compare()', () => {
    test('should return true if bcrypt returns true', () => {
      const sut = new Encrypter()
      const isValuesMatch = sut.compare('any_value', 'hashed_value')
      expect(isValuesMatch).toBe(true)
    })
  })
})
