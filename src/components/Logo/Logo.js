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
            tiltMaxAngleX: '55',
            tiltMaxAngleY: '55',
            height: '150px',
            width: '150px',
            transitionSpeed: '800',
            alignContent: 'center'
          }}
      >
        <img
          className='Tilt-inner'
          style=
            {{
              height: '85%'
            }}
          src={brain}
          alt="brain logo"
        />
      </Tilt>
    </div>
  )
}

export default Logo;