const TokenGenerator = require('./token-generator')
const jwt = require('jsonwebtoken')

describe('Token Generator', () => {
  test('should return null if JWT returns null', () => {
    const sut = makeSut()
    jwt.sign.mockReturnValueOnce(null)
    const token = sut.generate('any_id')
    expect(token).toBeNull()
  })
  test('should return a token if JWT returns a token', () => {
    const sut = makeSut()
    const token = sut.generate('any_id')
    expect(token).toBe('any_token')
  })
})

function makeSut () {
  const sut = new TokenGenerator()
  return sut
}
