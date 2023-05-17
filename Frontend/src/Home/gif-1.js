import React from 'react'
import gif1c from '../assets/cubes.mp4'

const Gif1 = () => {
  return (
    <div >
        <div>
            <video src={gif1c} autoPlay loop muted />
        </div>
        
    </div>
  )
}

export default Gif1;
