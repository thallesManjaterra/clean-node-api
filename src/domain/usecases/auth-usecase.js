class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new Error()
    }
  }
}

module.exports = AuthUseCase
