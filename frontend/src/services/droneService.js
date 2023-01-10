import axios from 'axios'
const baseUrl = '/api/'

const getOffenders = async () => {
  const response = await axios.get(baseUrl + 'offenders')
  if (response.status === 200) return response.data
  else return null
}

const getDrones = async () => {
  const response = await axios.get(baseUrl + 'drones')
  if (response.status === 200) return response.data
  else return null
}

const droneService = { getOffenders, getDrones }

export default droneService
