class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (_id, accessToken) {
    await this.userModel.updateOne(
      { _id },
      { $set: { accessToken } }
    )
  }
}

module.exports = UpdateAccessTokenRepository
