import React from 'react';
import loading from '../../assets/loading.gif';

export default function Loader() {
  return (
    <div className='loading-icon-wrapper'>
      <img
        className='loading-icon'
        src={loading}
        alt='loading icon, the projects are loading'
      />
    </div>
  )
}