const AuthUseCase = require('./auth-usecase')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

describe('Auth Usecase', () => {
  test('should throw if no email is provided', async () => {
    const { sut } = makeSut()
    expect(sut.auth()).rejects.toThrow(new MissingParamError('email'))
  })
  test('should throw if no password is provided', async () => {
    const { sut } = makeSut()
    expect(sut.auth('any_email@mail.com')).rejects.toThrow(new MissingParamError('password'))
  })
  test('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut()
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserByEmailRepositoryMock.load).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('should throw if LoadUserByEmailRepository is not provided', async () => {
    const sut = new AuthUseCase()
    const authPromise = sut.auth('any_email@mail.com', 'any_password')
    expect(authPromise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })
  test('should throw if LoadUserByEmailRepository.load is not provided', async () => {
    const sut = new AuthUseCase({})
    const authPromise = sut.auth('any_email@mail.com', 'any_password')
    expect(authPromise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })
  test('should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut()
    loadUserByEmailRepositoryMock.load.mockResolvedValueOnce(null)
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })
  test('should call Encrypter with correct values', async () => {
    const { sut, encrypterMock } = makeSut()
    await sut.auth('valid_email@mail.com', 'any_password')
    expect(encrypterMock.compare).toHaveBeenCalledWith('any_password', makeFakeHashedPassword())
  })
})

function makeSut () {
  const encrypterMock = makeEncrypter()
  const loadUserByEmailRepositoryMock = makeLoadUserByEmailRepository()
  const sut = new AuthUseCase(loadUserByEmailRepositoryMock, encrypterMock)
  return {
    sut, loadUserByEmailRepositoryMock, encrypterMock
  }
}

function makeLoadUserByEmailRepository () {
  return {
    load: jest.fn(async () => Promise.resolve({
      password: makeFakeHashedPassword()
    }))
  }
}

function makeFakeHashedPassword () {
  return 'hashed_password'
}

function makeEncrypter () {
  return {
    compare: jest.fn()
  }
}
