const droneUrl = '/api/drones'
const offenderUrl = '/api/offenders'

const getData = async (url) => {
  return fetch(url).then((response) => {
    if (response.status !== 200) return null
    return response.json()
  })
}

const getOffenders = () => getData(offenderUrl)

const getDrones = () => getData(droneUrl)

const droneService = { getOffenders, getDrones }

export default droneService
