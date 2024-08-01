import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  const faceBoxes = box.map((obj, index) => {
    return (
      <div
        className='bounding-box'
        style={{ ...obj }}
        key={index}
      >
      </div>)
  })
  
  
  return (
    <div className='center ma'>
      <div className='image-container absolute mt2'>
        <img
          id='inputimage'
          src={imageUrl}
          alt=""
          width='500px'
          height='auto'
        />
        <div>
          {faceBoxes}
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition;