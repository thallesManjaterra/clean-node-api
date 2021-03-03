import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect () {
    await this.client.close()
    this.client = null
  },
  async getCollection (collectionName: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await MongoHelper.connect(this.uri)
    }
    return this.client.db().collection(collectionName)
  },
  formatId (data: any): any {
    const { _id: id, ...dataWithoutId } = data
    return { id, ...dataWithoutId }
  }
}
