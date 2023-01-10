import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getOffenders } from './reducers/offenderReducer'
import { getDrones } from './reducers/droneReducer'
import OffenderTable from './components/OffenderTable'
import DroneVisual from './components/DroneVisual'

const App = () => {
  const dispatch = useDispatch()

  const updateData = () => {
    dispatch(getOffenders())
    dispatch(getDrones())
  }

  useEffect(() => {
    updateData()
  }, [])

  setInterval(() => updateData(), 2000)

  return (
    <div>
      <DroneVisual />
      <OffenderTable />
    </div>
  )
}

export default App
