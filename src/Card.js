import React from 'react'
import './style.css';

const Card = ({player}) => {
  return (
    <div className='card'>
      {player}
    </div>
  )
}

export default Card
