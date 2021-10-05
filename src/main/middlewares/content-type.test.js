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
  test('should return xml content-type when res.type is set as xml', async () => {
    app.get('/test_content-type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content-type_xml')
      .expect('content-type', /xml/)
  })
})
