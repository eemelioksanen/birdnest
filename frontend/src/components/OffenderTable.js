import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import '../styles/Offenders.css'

const OffenderTable = () => {
  const offenders = useSelector((state) => state.offenders)

  const parseTime = (offender) => {
    const delta = Date.now() - offender.localTime
    const minutes = Math.floor(delta / 60000)
    const seconds = Math.floor(((delta / 60000) % 1).toFixed(2) * 60)
    return `${minutes} min ${seconds} sec ago`
  }

  const COLUMNS = [
    {
      Header: 'pilot ID',
      accessor: 'drone_id',
    },
    {
      Header: 'pilot',
      accessor: 'pilot',
    },
    {
      Header: 'phone number',
      accessor: 'phone',
    },
    {
      Header: 'registeration date',
      accessor: 'registeration',
    },
    {
      Header: 'email',
      accessor: 'email',
    },
    {
      Header: 'closest distance (reported)',
      accessor: 'distance',
    },
    {
      Header: 'timestamp',
      accessor: 'timestamp',
    },
    {
      Header: 'last seen',
      accessor: 'lastseen',
    },
  ]

  const [data, setData] = useState([])
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {
    const offenderData = offenders.map((offender) => {
      return {
        drone_id: offender.pilot.pilotId,
        pilot: `${offender.pilot.firstName} ${offender.pilot.lastName}`,
        phone: offender.pilot.phoneNumber,
        registeration: offender.pilot.createdDt,
        email: offender.pilot.email,
        distance: `${Math.floor(offender.distance / 1000)} m (${
          offender.distance
        })`,
        timestamp: offender.timestamp,
        lastseen: parseTime(offender),
      }
    })
    setData(offenderData)
  }, [offenders])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <div className='Offenders'>
      <div className='Inner'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
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
