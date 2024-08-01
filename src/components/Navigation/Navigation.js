import React from 'react';

import './Navigation.css';

const Navigation = ({ children, onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='Navigation'>
        <div className='left-square'>
          {children}
        </div>
        <div className='middle'>
        </div>
        <p
          onClick={() => onRouteChange('signout')}
          className='right f3 link dim black underline ma0 pointer'
        >Sign Out</p>
      </nav>
    )
  } else {
    return (
      <nav className='Navigation'>
        <div className='left-square'>
          {children}
        </div>
        <div className='middle'>
        </div>
        <p
          onClick={() => onRouteChange('signin')}
          className='right f3 link dim black underline ma0 pointer'
        >Sign In</p>
        <p
          onClick={() => onRouteChange('register')}
          className='right f3 link dim black underline ma0 pointer'
        >Register</p>
      </nav>
    )
  }
}

export default Navigation;