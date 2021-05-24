import React from 'react';
import notFound from '../static/notfound.png';
// eslint-disable-next-line arrow-body-style
const Fallback = () => {
  return (
    <div>
      <img src={notFound} alt="notFound" />
    </div>
  );
};

export default Fallback;
