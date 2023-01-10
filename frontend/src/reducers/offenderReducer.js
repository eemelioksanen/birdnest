import { createSlice } from '@reduxjs/toolkit'
import droneService from '../services/droneService'

const initialState = []

const offenderSlice = createSlice({
  name: 'offenders',
  initialState,
  reducers: {
    setOffenders(state, action) {
      return action.payload
    },
  },
})

export const { setOffenders } = offenderSlice.actions

export const getOffenders = () => {
  return async (dispatch) => {
    const offenders = await droneService.getOffenders()
    dispatch(setOffenders(offenders))
  }
}

export default offenderSlice.reducer
