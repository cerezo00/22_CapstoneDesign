import React from 'react';

import './css/Header.css';
import arrow from './img/arrow-left.png';

const Header = function () {
  return (
    <div className="header">
      <button type="button" className="header-back">
        <img alt="back" src={arrow} className="header-img" />
      </button>
      <span className="header-text">주문</span>
    </div>
  );
};

export default Header;
