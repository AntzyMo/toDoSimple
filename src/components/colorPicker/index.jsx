import { ChromePicker } from 'react-color'
import { useState } from 'react'


const ColorPicker = () => {
  const [color, setColor] = useState('skyblue')

  const handleChangeComplete = (color) => {
    console.log(color, 'color')
    setColor(color.hex)
    console.log(color)
  }


  return (
    <ChromePicker color={color} onChange={handleChangeComplete} />
  )
}

export default ColorPicker