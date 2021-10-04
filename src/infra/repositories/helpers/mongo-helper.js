const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.dbName = dbName
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db(dbName)
  },
  async disconnect () {
    await this.client.close()
    this.db = null
    this.client = null
  },
  async getCollection (collectionName) {
    if (!this.client?.topology.isConnected()) {
      await this.connect(this.uri, this.dbName)
    }
    return this.db.collection(collectionName)
  }
}
