import { useSelector } from 'react-redux'
import '../styles/Offenders.css'

const OffenderTable = () => {
  const offenders = useSelector((state) => state.offenders)

  const parseTime = (offender) => {
    const delta = Date.now() - offender.lastSeen
    const minutes = Math.floor(delta / 60000)
    const seconds = Math.floor(((delta / 60000) % 1).toFixed(2) * 60)
    return `${minutes} min ${seconds} sec ago`
  }

  return (
    <div className='Offenders'>
      <div className='Inner'>
        <table>
          <tbody>
            <tr>
              <th>drone ID</th>
              <th>pilot ID</th>
              <th>pilot</th>
              <th>phone number</th>
              <th>email</th>
              <th>closest distance (reported)</th>
              <th>last seen</th>
            </tr>
            {offenders.map((offender) => {
              return (
                <tr key={offender.pilot.pilotId}>
                  <td>{offender.droneSerialNumber}</td>
                  <td>{offender.pilot.pilotId}</td>
                  <td>
                    {offender.pilot.firstName} {offender.pilot.lastName}
                  </td>
                  <td>{offender.pilot.phoneNumber}</td>
                  <td>{offender.pilot.email}</td>
                  <td>
                    {Math.floor(offender.distance / 1000)} m (
                    {offender.distance})
                  </td>
                  <td>{parseTime(offender)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OffenderTable
