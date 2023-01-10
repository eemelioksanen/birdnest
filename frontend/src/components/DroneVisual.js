import { useSelector } from 'react-redux'
import { Stage, Layer, Circle, Text, Rect, Group, Image } from 'react-konva'

const originX = 285
const originY = 285

const Drone = ({ data }) => {
  return (
    <Group>
      <Circle
        x={originX + Number(data.positionX._text) / 1000 - 250}
        y={originY - Number(data.positionY._text) / 1000 + 250}
        radius={5}
        fill='grey'
        stroke='white'
      />
      <Text
        text={data.serialNumber._text}
        x={originX + Number(data.positionX._text) / 1000 - 250 - 45}
        y={originY - Number(data.positionY._text) / 1000 + 250 + 20}
        fill='white'
      />
    </Group>
  )
}

const Background = () => {
  const size = 500
  const backRectMultiplier = 1.1
  return (
    <Group>
      <Rect
        x={originX - (size * backRectMultiplier) / 2}
        y={originY - 275}
        width={size * backRectMultiplier}
        height={size * backRectMultiplier}
        stroke='dark'
        shadowBlur={20}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: size * backRectMultiplier,
          y: size * backRectMultiplier,
        }}
        fillLinearGradientColorStops={[0, 'lightblue', 1, 'lightgreen']}
      />
      <Text text='0, 0' x={originX - 270} y={originY + 255} fill='black' />
      <Text text='0, 500' x={originX - 270} y={originY - 265} fill='black' />
      <Text text='500, 0' x={originX + 220} y={originY + 255} fill='black' />
      <Text text='500, 500' x={originX + 220} y={originY - 265} fill='black' />
      <Rect
        x={originX - size / 2}
        y={originY - 250}
        width={size}
        height={size}
        fill='#1d1e30'
        stroke='black'
        shadowBlur={20}
      />
    </Group>
  )
}

const NoFlyArea = () => {
  const radius = 100
  return <Circle x={originX} y={originY} radius={radius} stroke='lightblue' />
}

const Duck = () => {
  return <Circle x={originX} y={originY} radius={5} fill='red' stroke='white' />
}

const style = {
  display: 'inline-block',
  color: 'white',
  width: '50%',
  float: 'left',
}

const DroneVisual = () => {
  const drones = useSelector((state) => state.drones)
  return (
    <div style={style}>
      <Stage width={700} height={570}>
        <Layer>
          <Background />
          <Duck />
          <NoFlyArea />
          {drones.map((drone) => {
            return <Drone key={drone.serialNumber._text} data={drone} />
          })}
        </Layer>
      </Stage>
    </div>
  )
}

export default DroneVisual
