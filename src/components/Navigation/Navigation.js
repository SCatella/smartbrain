import React from 'react';

import './Navigation.css';

const Navigation = ({children}) => {
  return (
    <nav className='Navigation'>
      <div className='left-square'>
        {children}
      </div>
      <div className='middle'>
      </div>
      <p
        className='right f3 link dim black underline ma0 pointer'
      >Sign Out</p>
    </nav>
  )
}

export default Navigation;