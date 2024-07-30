import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  
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
        <div
          className='bounding-box'
          style={{ ...box }}
          >
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition;