import { useSelector } from 'react-redux'
import { Stage, Layer, Circle, Text, Rect, Group } from 'react-konva'
import '../styles/DroneVisual.css'

// add padding to the left and top sides of the drawing area
const padding = 15

// position of the 'origin' of the circle in pixels
// the whole visualizer moves according to the origin
const originX = 275 + padding
const originY = 275 + padding

const areaSize = 500 // size of one side of the visualizer area square

const Drone = ({ drone }) => {
  const dronePosX = Number(drone.positionX._text) / 1000
  const dronePosY = Number(drone.positionY._text) / 1000

  // x and y position of the bottom left corner of the draw area
  const xOffset = originX - areaSize / 2
  const yOffset = originY + areaSize / 2

  let textPosX
  let textPosY

  const horizontalTextLimit = 60
  // prevent text from going over the border in horizontal direction
  if (dronePosX < horizontalTextLimit) {
    textPosX = xOffset
  } else if (dronePosX > areaSize - horizontalTextLimit) {
    textPosX = areaSize - horizontalTextLimit + xOffset - 35
  } else {
    textPosX = dronePosX + xOffset - 45
  }

  const verticalTextLimit = 50
  // prevent text from going over the border in vertical direction
  if (dronePosY < verticalTextLimit) {
    textPosY = areaSize - dronePosY + originY - 275
  } else {
    textPosY = originY - dronePosY + 270
  }

  return (
    <Group>
      <Circle
        x={dronePosX + xOffset}
        y={-dronePosY + yOffset}
        radius={5}
        fill='grey'
        stroke='white'
      />
      <Text
        text={`${drone.serialNumber._text}
        ${Math.floor(dronePosX)}, ${Math.floor(dronePosY)}`}
        x={textPosX}
        y={textPosY}
        fill='white'
      />
    </Group>
  )
}

const Background = () => {
  const backRectMultiplier = 1.1
  return (
    <Group>
      <Rect
        x={originX - (areaSize * backRectMultiplier) / 2}
        y={originY - 275}
        width={areaSize * backRectMultiplier}
        height={areaSize * backRectMultiplier}
        stroke='dark'
        shadowBlur={20}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: areaSize * backRectMultiplier,
          y: areaSize * backRectMultiplier,
        }}
        fillLinearGradientColorStops={[0, 'lightblue', 1, 'lightgreen']}
        cornerRadius={10}
      />
      <Text text='0, 0' x={originX - 270} y={originY + 255} fill='black' />
      <Text text='0, 500' x={originX - 270} y={originY - 265} fill='black' />
      <Text text='500, 0' x={originX + 220} y={originY + 255} fill='black' />
      <Text text='500, 500' x={originX + 220} y={originY - 265} fill='black' />
      <Rect
        x={originX - areaSize / 2}
        y={originY - areaSize / 2}
        width={areaSize}
        height={areaSize}
        fill='#1d1e30'
        stroke='black'
        shadowBlur={20}
        cornerRadius={10}
      />
    </Group>
  )
}

const NoFlyArea = () => {
  const radius = 100
  return <Circle x={originX} y={originY} radius={radius} stroke='lightblue' />
}

const Bird = () => {
  return <Circle x={originX} y={originY} radius={5} fill='red' stroke='white' />
}

const DroneVisual = () => {
  const drones = useSelector((state) => state.drones)
  return (
    <div className='DroneVisual'>
      <div className='canvas'>
        <Stage width={areaSize * 1.2} height={areaSize * 1.2}>
          <Layer>
            <Background />
            <Bird />
            <NoFlyArea />
            {drones.map((drone) => {
              return <Drone key={drone.serialNumber._text} drone={drone} />
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

export default DroneVisual
