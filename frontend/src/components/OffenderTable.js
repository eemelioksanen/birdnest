import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const OffenderTable = () => {
  const style = {
    marginTop: '5px',
  }

  const offenders = useSelector((state) => state.offenders)

  const parseTime = (offender) => {
    const delta = Date.now() - offender.localTime
    const minutes = Math.floor(delta / 60000)
    const seconds = Math.floor(((delta / 60000) % 1).toFixed(2) * 60)
    return `${minutes} min ${seconds} sec ago`
  }

  return (
    <div>
      <Table striped style={style}>
        <tbody>
          <tr>
            <th>pilot id</th>
            <th>name</th>
            <th>phone number</th>
            <th>creation date</th>
            <th>email</th>
            <th>smallest distance (reported)</th>
            <th>timestamp</th>
            <th>last seen</th>
          </tr>
          {offenders.map((offender) => {
            return (
              <tr key={offender.pilot.pilotId}>
                <td>{offender.pilot.pilotId}</td>
                <td>
                  {offender.pilot.firstName} {offender.pilot.lastName}
                </td>
                <td>{offender.pilot.phoneNumber}</td>
                <td>{offender.pilot.createdDt}</td>
                <td>{offender.pilot.email}</td>
                <td>
                  {Math.floor(offender.distance / 1000)} m ({offender.distance})
                </td>
                <td>{offender.timestamp}</td>
                <td>{parseTime(offender)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default OffenderTable
