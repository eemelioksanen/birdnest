import { createSlice } from '@reduxjs/toolkit'
import droneService from '../services/droneService'

const initialState = []

const droneSlice = createSlice({
  name: 'drones',
  initialState,
  reducers: {
    setDrones(state, action) {
      return action.payload
    },
  },
})

export const { setDrones } = droneSlice.actions

export const getDrones = () => {
  return async (dispatch) => {
    const drones = await droneService.getDrones()
    dispatch(setDrones(drones))
  }
}

export default droneSlice.reducer
