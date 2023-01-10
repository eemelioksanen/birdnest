import { useSelector } from 'react-redux'
import { Stage, Layer, Circle, Text, Rect, Image, Group } from 'react-konva'

const originX = 275 // window.innerWidth / 2
const originY = 275

const Drone = ({ data }) => {
  return (
    <Group>
      <Circle
        x={originX + Number(data.positionX._text) / 1000 - 250}
        y={originY - Number(data.positionY._text) / 1000 + 250}
        radius={5}
        fill={'black'}
      />
      <Text
        text={data.serialNumber._text}
        x={originX + Number(data.positionX._text) / 1000 - 250 - 45}
        y={originY - Number(data.positionY._text) / 1000 + 250 + 20}
      />
    </Group>
  )
}

const Background = () => {
  const size = 500
  return (
    <Rect
      x={originX - size / 2}
      y={25}
      width={size}
      height={size}
      fill='lightgreen'
      stroke='black'
    />
  )
}

const NoFlyArea = () => {
  const radius = 100
  return <Circle x={originX} y={originY} radius={radius} stroke='red' />
}

const Duck = () => {
  return <Circle x={originX} y={originY} radius={5} fill='brown' />
}

const DroneVisual = () => {
  const drones = useSelector((state) => state.drones)
  return (
    <div>
      <Stage width={window.innerWidth} height={550}>
        <Layer>
          <Background />
          <NoFlyArea />
          {drones.map((drone) => {
            return <Drone key={drone.serialNumber._text} data={drone} />
          })}
          <Duck />
        </Layer>
      </Stage>
    </div>
  )
}

export default DroneVisual
