const axios = require('axios')
const parser = require('xml-js')

const droneUrl = 'http://assignments.reaktor.com/birdnest/drones'
const pilotUrl = 'http://assignments.reaktor.com/birdnest/pilots/'

const getData = async () => {
  try {
    const response = await axios.get(droneUrl)
    if (response.status === 200) {
      const parsed = parser.xml2js(response.data, { compact: true, spaces: 4 })
      return parsed
    } else return null
  } catch (exception) {
    console.log(exception.message)
  }
}

const getPilotData = async (id) => {
  try {
    const response = await axios.get(pilotUrl + id)
    if (response.status === 200) return response.data
    else return null
  } catch (exception) {
    console.log(exception.message)
  }
}

module.exports = { getData, getPilotData }
