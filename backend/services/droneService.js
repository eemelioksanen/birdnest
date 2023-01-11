const parser = require('xml-js')

const droneUrl = 'http://assignments.reaktor.com/birdnest/drones'
const pilotUrl = 'http://assignments.reaktor.com/birdnest/pilots/'

const getAllData = async () => {
  return fetch(droneUrl)
    .then((response) => {
      if (response.status !== 200) return null
      return response.text()
    })
    .then((xmlString) => {
      return parser.xml2js(xmlString, { compact: true })
    })
    .catch((error) => console.log(error.message))
}

const getPilotData = async (id) => {
  return fetch(pilotUrl + id)
    .then((response) => {
      if (response.status !== 200) return null
      return response.json()
    })
    .catch((error) => console.log(error.message))
}

module.exports = { getAllData, getPilotData }
