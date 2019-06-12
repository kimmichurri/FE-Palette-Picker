import React from 'react';
import colorLoader from '../../assets/colorLoader.gif';

export default function Loader() {
  return (
    <div className='loading-icon-wrapper'>
      <img
        className='loading-icon'
        src={colorLoader}
        alt='loading icon, the projects are loading'
      />
    </div>
  )
}