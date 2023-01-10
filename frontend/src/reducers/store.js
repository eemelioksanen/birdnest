import { configureStore } from '@reduxjs/toolkit'
import droneReducer from './droneReducer'
import offenderReducer from './offenderReducer'

const store = configureStore({
  reducer: {
    offenders: offenderReducer,
    drones: droneReducer,
  },
})

export default store
