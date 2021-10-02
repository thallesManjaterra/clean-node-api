const TokenGenerator = require('./token-generator')
const jwt = require('jsonwebtoken')
const { MissingParamError } = require('../errors')

const SECRET_KEY = 'secret_key'

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
  test('should call if JWT with correct values', () => {
    const sut = makeSut()
    sut.generate('any_id')
    expect(jwt.sign).toHaveBeenCalledWith('any_id', SECRET_KEY)
  })
  test('should throw if no secret is provided', () => {
    const sut = new TokenGenerator()
    expect(() => { sut.generate('any_id') }).toThrow(new MissingParamError('secretKey'))
  })
})

function makeSut () {
  const sut = new TokenGenerator(SECRET_KEY)
  return sut
}
