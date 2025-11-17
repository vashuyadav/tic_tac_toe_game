import React from 'react'

const Block = (props) => {
  return (
    <div onClick={props.onClick} className='block'>
      {props.value}
    </div>
  )
}

export default Block
