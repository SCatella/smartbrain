import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        className='Tilt'
        style=
        {{
          height: '150px',
          width: '150px',
          backgroundColor: 'darkgreen',
          tiltMaxAngleX: '55',
          tiltMaxAngleY: '55',
          transitionSpeed: '800'
        }}
      >
        <img className='Tilt-inner pa3' src={brain} alt="brain logo" />
      </Tilt>
    </div>
  )
}

export default Logo;