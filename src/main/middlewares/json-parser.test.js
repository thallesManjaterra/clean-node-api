const app = require('../config/app')
const request = require('supertest')

describe('JSON Parser middleware', () => {
  test('should parse req body as json', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })
    const res = await request(app).post('/test_json_parser').send(fakeData())
    expect(res.body).toEqual(fakeData())
  })
})

function fakeData () {
  return { data: 'any_data' }
}
