import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content-type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content-type')
      .expect('content-type', /json/)
  })
  test('should return xml content type when forced', async () => {
    app.get('/test_content-type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content-type_xml')
      .expect('content-type', /xml/)
  })
})
