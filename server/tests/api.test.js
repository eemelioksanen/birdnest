const supertest = require('supertest')
const app = require('../app')
const http = require('http')
const testData = require('./test-data')

const api = supertest(app)

const pilotsQueried = [false, false, false] // keeps track of what pilot data has been queried

// a local server hosting data, imitating the actual api the server is using but with static data
const dataServer = http
  .createServer(function (req, res) {
    const url = req.url
    const pilots = testData.pilots

    // endpoints
    switch (url) {
      case '/drones':
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write(testData.textXML)
        break
      case '/pilots/drones/SN-Xi8QK_9-Ug':
        pilotsQueried[0] = true
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(pilots[0]))
        break
      case '/pilots/SN-swBVR7pl2V':
        pilotsQueried[1] = true
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(pilots[1]))
        break
      case '/pilots/SN-7t_Oj4cK9G':
        pilotsQueried[2] = true
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(pilots[2]))
        break
      default:
        res.writeHead(404)
    }

    res.end()
  })
  .listen(process.env.TEST_SERVER_PORT)

beforeAll(async () => {
  // wait for half a second so the http servers have time to start
  await new Promise((resolve) => setTimeout(resolve, 500))
})

afterAll((done) => {
  dataServer.close()
  done()
})

test('Server should return the correct data as a JSON object', async () => {
  const response = await api
    .get('/api/drones')
    .expect(200)
    .expect('Content-type', /application\/json/)

  expect(response.body).toEqual(testData.drones) // all drone data should be correct
})

describe('when offender data is queried', () => {
  test('Server should return the correct offenders as a JSON object', async () => {
    const response = await api
      .get('/api/offenders')
      .expect(200)
      .expect('Content-type', /application\/json/)

    const offenderData = response.body
    expect(offenderData).toHaveLength(1) // the server should return information only about the sole offender present in the data
    expect(offenderData[0].pilot).toEqual(testData.pilots[2]) // the only offender in the data is the last member
  })

  test('non-offender pilot data should not be queried', () => {
    expect(pilotsQueried).toEqual([false, false, true])
  })
})
