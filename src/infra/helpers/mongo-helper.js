const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db()
  },
  async disconnect () {
    await this.client.close()
    this.db = null
    this.client = null
  },
  async getCollection (collectionName) {
    if (!this.client?.topology.isConnected()) {
      await this.connect(this.uri)
    }
    return this.db.collection(collectionName)
  }
}
