import React from 'react';
import notFound from '../static/notFound.svg';
// eslint-disable-next-line arrow-body-style
const Fallback = () => {
  return (
    <div
      style={{
        padding: '20px',
        maxHeight: '100%',
        maxWidth: '100%',
      }}
    >
      <a href="http://inventory-management.com/">
        <img
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
          }}
          src={notFound}
          alt="notFound"
        />
      </a>
    </div>
  );
};

export default Fallback;
