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
    const sut = new AuthUseCase({})
    const authPromise = sut.auth('any_email@mail.com', 'any_password')
    expect(authPromise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })
  test('should throw if LoadUserByEmailRepository.load is not provided', async () => {
    const sut = new AuthUseCase({ loadUserByEmailRepository: {} })
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
  test('should return null if Encrypter returns false', async () => {
    const { sut, encrypterMock } = makeSut()
    encrypterMock.compare.mockReturnValueOnce(false)
    const accessToken = await sut.auth('valid_email@mail.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })
  test('should call TokenGenerator with correct value', async () => {
    const { sut, tokenGeneratorMock } = makeSut()
    await sut.auth('valid_email@mail.com', 'valid_password')
    expect(tokenGeneratorMock.generate).toHaveBeenCalledWith(makeFakeId())
  })
  test('should return an access token if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('valid_email@mail.com', 'valid_password')
    expect(accessToken).toBe(makeFakeToken())
  })
})

function makeSut () {
  const loadUserByEmailRepositoryMock = makeLoadUserByEmailRepository()
  const encrypterMock = makeEncrypter()
  const tokenGeneratorMock = makeTokenGenerator()
  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositoryMock,
    encrypter: encrypterMock,
    tokenGenerator: tokenGeneratorMock
  })
  return {
    sut, loadUserByEmailRepositoryMock, encrypterMock, tokenGeneratorMock
  }
}

function makeLoadUserByEmailRepository () {
  return {
    load: jest.fn(async () => Promise.resolve({
      id: makeFakeId(),
      password: makeFakeHashedPassword()
    }))
  }
}

function makeFakeId () {
  return 'any_id'
}

function makeFakeHashedPassword () {
  return 'hashed_password'
}

function makeEncrypter () {
  return {
    compare: jest.fn(() => true)
  }
}

function makeTokenGenerator () {
  return {
    generate: jest.fn(() => makeFakeToken())
  }
}

function makeFakeToken () {
  return 'any_token'
}
