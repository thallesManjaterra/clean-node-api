const AuthUseCase = require('./auth-usecase')
const { MissingParamError } = require('../../utils/errors')

describe('Auth Usecase', () => {
  test('should throw if no email is provided', async () => {
    const { sut } = makeSut()
    expect(sut.auth()).rejects.toThrow(new MissingParamError('email'))
  })
  test('should throw if no password is provided', async () => {
    const { sut } = makeSut()
    expect(sut.auth('any_email@mail.com')).rejects.toThrow(
      new MissingParamError('password')
    )
  })

  test('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositoryMock } = makeSut()
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadUserByEmailRepositoryMock.load).toHaveBeenCalledWith(
      'any_email@mail.com'
    )
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
    expect(encrypterMock.compare).toHaveBeenCalledWith(
      'any_password',
      makeFakeHashedPassword()
    )
  })
  test('should return null if Encrypter returns false', async () => {
    const { sut, encrypterMock } = makeSut()
    encrypterMock.compare.mockReturnValueOnce(false)
    const accessToken = await sut.auth(
      'valid_email@mail.com',
      'invalid_password'
    )
    expect(accessToken).toBeNull()
  })

  test('should call TokenGenerator with correct value', async () => {
    const { sut, tokenGeneratorMock } = makeSut()
    await sut.auth('valid_email@mail.com', 'valid_password')
    expect(tokenGeneratorMock.generate).toHaveBeenCalledWith(makeFakeId())
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryMock } = makeSut()
    await sut.auth('valid_email@mail.com', 'valid_password')
    expect(updateAccessTokenRepositoryMock.update).toHaveBeenCalledWith(makeFakeId(), makeFakeToken())
  })

  test('should return an access token if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('valid_email@mail.com', 'valid_password')
    expect(accessToken).toBe(makeFakeToken())
  })

  test('should throw if invalid dependencies are provided', async () => {
    const invalid = {}
    const loadUserByEmailRepository = makeLoadUserByEmailRepository()
    const encrypter = makeEncrypter()
    const tokenGenerator = makeTokenGenerator()
    const suts = [
      new AuthUseCase(),
      new AuthUseCase({}),
      new AuthUseCase({
        loadUserByEmailRepository: invalid
      }),
      new AuthUseCase({
        loadUserByEmailRepository
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter: invalid
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator: invalid
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypter,
        tokenGenerator,
        updateAccessTokenRepository: invalid
      })
    ]
    for (const sut of suts) {
      await expect(
        sut.auth('any_email@mail.com', 'any_password')
      ).rejects.toThrow()
    }
  })

  test('should throw if any dependency throws', async () => {
    const dependencies = [
      ['loadUserByEmailRepositoryMock', 'load'],
      ['encrypterMock', 'compare'],
      ['tokenGeneratorMock', 'generate'],
      ['updateAccessTokenRepositoryMock', 'update']
    ]
    const instance = 0
    const method = 1
    for (const dependency of dependencies) {
      const suts = makeSut()
      suts[dependency[instance]][dependency[method]].mockImplementationOnce(() => {
        throw new Error()
      })
      await expect(
        suts.sut.auth('any_email@mail.com', 'any_password')
      ).rejects.toThrow()
    }
  })
})

function makeSut () {
  const loadUserByEmailRepositoryMock = makeLoadUserByEmailRepository()
  const encrypterMock = makeEncrypter()
  const tokenGeneratorMock = makeTokenGenerator()
  const updateAccessTokenRepositoryMock = makeUpdateAccessTokenRepository()
  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositoryMock,
    encrypter: encrypterMock,
    tokenGenerator: tokenGeneratorMock,
    updateAccessTokenRepository: updateAccessTokenRepositoryMock
  })
  return {
    sut,
    loadUserByEmailRepositoryMock,
    encrypterMock,
    tokenGeneratorMock,
    updateAccessTokenRepositoryMock
  }
}

function makeLoadUserByEmailRepository () {
  return {
    load: jest.fn(async () =>
      Promise.resolve({
        id: makeFakeId(),
        password: makeFakeHashedPassword()
      })
    )
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

function makeUpdateAccessTokenRepository () {
  return {
    update: jest.fn()
  }
}
