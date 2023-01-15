const droneRouter = require('express').Router()

droneRouter.get('/drones', async (req, res, next) => {
  try {
    const data = req.app.locals.drones
    res.status(200).send(data)
  } catch (exception) {
    res.status(404).send()
    next(exception)
  }
})

droneRouter.get('/offenders', async (req, res, next) => {
  try {
    const data = req.app.locals.offenders
    res.status(200).send(data)
  } catch (exception) {
    res.status(404).send()
    next(exception)
  }
})

module.exports = droneRouter
