import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getOffenders } from './reducers/offenderReducer'
import { getDrones } from './reducers/droneReducer'
import OffenderTable from './components/OffenderTable'
import DroneVisual from './components/DroneVisual'
import Navigation from './components/Navigation'
import About from './components/About'
import './styles/App.css'

const App = () => {
  const dispatch = useDispatch()

  const updateData = () => {
    dispatch(getOffenders())
    dispatch(getDrones())
  }

  useEffect(() => {
    updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  setInterval(() => updateData(), 1500)

  return (
    <div className='App'>
      <Navigation />
      <DroneVisual />
      <About />
      <OffenderTable />
    </div>
  )
}

export default App
