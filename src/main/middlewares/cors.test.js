const request = require('supertest')
const app = require('../config/app')

describe('CORS middleware', () => {
  test('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.end()
    })
    const res = await request(app).get('/test_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
