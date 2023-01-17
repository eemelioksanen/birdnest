const express = require('express')
const droneService = require('./services/droneService')
const router = require('./controllers/router')

const app = express()

// configure app
if (process.env.NODE_ENV === 'production') {
  const BUILD_DIR = '../client/build'
  app.use(express.static(BUILD_DIR))
}
app.use('/api', router)
app.locals.capture = [] // a variable storing the capture data as a whole
app.locals.offenders = [] // a variable storing data about the offender pilots
app.locals.drones = [] // a variable storing data about all drones

// constant values
const birdX = 250000.0
const birdY = 250000.0
const allowedDistance = 100000.0

// calculate drone distance to the bird
const distanceToBird = (drone) => {
  const droneX = Number(drone.positionX._text)
  const droneY = Number(drone.positionY._text)
  const xDistSquare = Math.pow(droneX - birdX, 2)
  const yDistSquare = Math.pow(droneY - birdY, 2)
  const distance = Math.sqrt(xDistSquare + yDistSquare)
  return distance
}

// connect the drone to a pilot and return the pilot data
const mapDroneToPilot = async (drone) => {
  const id = drone.serialNumber._text
  const pilot = await droneService.getPilotData(id)
  const distance = distanceToBird(drone)
  return {
    pilot,
    distance,
    droneSerialNumber: id,
  }
}

// update offender data in the app.locals.offenders array
const updateLocalOffenderData = (offender) => {
  const idx = app.locals.offenders.findIndex(
    (item) => item.pilot.pilotId === offender.pilot.pilotId
  )

  if (idx !== -1) {
    // offender is already in the array
    const oldDistance = app.locals.offenders[idx].distance
    offender.distance = Math.min(oldDistance, offender.distance)
    app.locals.offenders[idx] = offender
  } else {
    // offender is new
    app.locals.offenders.push(offender)
  }
}

// find and update the data of all offenders
const findAndUpdateOffenders = (capture) => {
  const currentTime = Date.now()

  // check all drones
  // in case the pilot is a known offender, update the lastSeen variable
  capture.drone.forEach((drone) => {
    const pilot = app.locals.offenders.find(
      (offender) => drone.serialNumber._text === offender.droneSerialNumber
    )
    if (pilot) pilot.lastSeen = Date.now()
  })

  // filter out offenders who have not been seen in 10 minutes (or 600 000 ms)
  app.locals.offenders = app.locals.offenders.filter(
    (offender) => currentTime - offender.lastSeen < 600000
  )

  const timestamp = capture._attributes.snapshotTimestamp
  const drones = capture.drone

  // find all the drones that are within 100-meter radius of the bird nest
  const offenderDrones = drones.filter(
    (drone) => distanceToBird(drone) < allowedDistance
  )

  // map all offender drones to their pilots and update their data
  offenderDrones.forEach((drone) => {
    mapDroneToPilot(drone)
      .then(({ ...pilot }) => {
        // add the new timestamp and lastSeen variables
        const pilotWithTimestamp = {
          ...pilot,
          timestamp,
          lastSeen: Date.now(),
        }
        updateLocalOffenderData(pilotWithTimestamp)
      })
      .catch((error) => {
        console.log(error.message)
      })
  })
}

// update all offender and drone data
const updateData = () => {
  droneService
    .getAllData()
    .then((data) => {
      if (!data) return
      const capture = data.report.capture
      findAndUpdateOffenders(capture)
      app.locals.capture = capture
      app.locals.drones = capture.drone
    })
    .catch((error) => {
      console.log(error.message)
    })
}

// update the state every 1.5 seconds or only once if testing
if (process.env.NODE_ENV === 'test') {
  updateData()
} else {
  setInterval(() => updateData(), 1500)
}

module.exports = app
