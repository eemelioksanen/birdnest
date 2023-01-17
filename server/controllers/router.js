const router = require('express').Router()

router.get('/drones', async (req, res, next) => {
  try {
    const data = req.app.locals.drones
    res.status(200).send(data)
  } catch (exception) {
    res.status(404).send()
    next(exception)
  }
})

router.get('/offenders', async (req, res, next) => {
  try {
    const data = req.app.locals.offenders
    res.status(200).send(data)
  } catch (exception) {
    res.status(404).send()
    next(exception)
  }
})

module.exports = router
