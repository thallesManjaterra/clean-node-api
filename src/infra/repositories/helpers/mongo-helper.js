const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.dbName = dbName
    this.uri = uri
    this.client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db(this.dbName)
  },
  async disconnect () {
    this.client.close()
  },

  isConnected () {
    return this.client?.topology.isConnected()
  },

  getCollection (collectionName) {
    return this.db.collection(collectionName)
  },

  async getDb () {
    if (!this.isConnected()) {
      await this.connect()
    }
    return this.db
  }
}
