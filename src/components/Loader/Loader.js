import React from 'react';
import rainbowLoader from '../../assets/rainbowLoader.gif';

export default function Loader() {
  return (
    <div className='loading-icon-wrapper'>
      <img
        className='loading-icon'
        src={rainbowLoader}
        alt='loading icon, the projects are loading'
      />
    </div>
  )
}