const app = require('../config/app')
const request = require('supertest')

describe('Content-Type middleware', () => {
  test('should return json as default content-type', async () => {
    app.get('/test_content-type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content-type')
      .expect('content-type', /json/)
  })
})
