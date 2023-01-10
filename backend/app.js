const express = require('express')
const cors = require('cors')
const droneService = require('./services/droneService')

const droneRouter = require('./controllers/drones')
const app = express()

// configure app
app.use(cors())
// app.use(express.json())
app.use('/api', droneRouter)
app.locals.capture = []
app.locals.offenders = []
app.locals.drones = []

// constant values
const birdX = 250000.0
const birdY = 250000.0
const allowedDistance = 100000.0

const distanceToBird = (drone) => {
  const droneX = Number(drone.positionX._text)
  const droneY = Number(drone.positionY._text)
  const xDistSquare = Math.pow(droneX - birdX, 2)
  const yDistSquare = Math.pow(droneY - birdY, 2)
  const distance = Math.sqrt(xDistSquare + yDistSquare)
  return distance
}

const updateOffenderData = (offender) => {
  const idx = app.locals.offenders.findIndex(
    (item) => item.pilot.pilotId === offender.pilot.pilotId
  )

  if (idx !== -1) {
    const oldDistance = app.locals.offenders[idx].distance
    offender.distance = Math.max(oldDistance, offender.distance)
    app.locals.offenders[idx] = offender
  } else {
    app.locals.offenders.push(offender)
  }
}

const mapDroneToPilot = async (drone) => {
  const Id = drone.serialNumber._text
  const pilot = await droneService.getPilotData(Id)
  const distance = distanceToBird(drone)
  return {
    pilot,
    distance,
    droneSerialNumber: Id,
  }
}

const updateOffenders = (capture) => {
  const currentTime = Date.now()

  capture.drone.forEach((drone) => {
    const pilot = app.locals.offenders.find(
      (offender) => drone.serialNumber._text === offender.droneSerialNumber
    )
    if (pilot) pilot.localTime = Date.now()
  })

  app.locals.offenders = app.locals.offenders.filter(
    (offender) => currentTime - offender.localTime < 600000
  )

  const timestamp = capture._attributes.snapshotTimestamp
  const drones = capture.drone
  const offenderDrones = drones.filter(
    (drone) => distanceToBird(drone) < allowedDistance
  )

  offenderDrones.forEach((drone) => {
    mapDroneToPilot(drone)
      .then(({ ...pilot }) => {
        const pilotWithTimestamp = {
          ...pilot,
          timestamp,
          localTime: Date.now(),
        }
        updateOffenderData(pilotWithTimestamp)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

const updateData = () => {
  droneService
    .getData()
    .then((data) => {
      const capture = data.report.capture
      updateOffenders(capture)
      app.locals.capture = capture
      app.locals.drones = capture.drone
    })
    .catch((error) => {
      console.log(error)
    })
}

// update the state every 2 seconds
setInterval(() => updateData(), 3000)

module.exports = app
