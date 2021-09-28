const EmailValidator = require('./email-validator')
const validator = require('validator')

describe('Email Validator', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })
  test('should return false if validator returns false', () => {
    validator.isEmail.mockReturnValueOnce(false)
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })
  test('should call EmailValidator.isEmail with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@mail.com')
    expect(validator.isEmail).toHaveBeenCalledWith('any_email@mail.com')
  })
})

function makeSut () {
  const sut = new EmailValidator()
  return sut
}
