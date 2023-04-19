import React from 'react';
import vector from '../../../assets/images/Vector.svg';
import mask from '../../../assets/images/mask.png';
import mask1 from '../../../assets/images/mask1.png';
import mask2 from '../../../assets/images/mask2.png';
import mask3 from '../../../assets/images/mask3.png';
import mask4 from '../../../assets/images/mask4.png';

import './InstagramShop.css';

const InstagramShop = () => {
  return (
    <div className="instagramShop">
      <p>
        SHOP INSTAGRAM{' '}
        <span>
          SHOP
          <img src={vector} />
        </span>
      </p>
      <div className="photos">
        <img src={mask} />
        <div>
          <img src={mask1} />
          <img src={mask2} />
          <img src={mask3} />
          <img src={mask4} />
        </div>
      </div>
      <span>#MODNIKKY</span>
    </div>
  );
};

export default InstagramShop;
