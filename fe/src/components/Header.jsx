import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import './css/Header.css';
import arrow from './img/arrow-left.png';
import cart from './img/shopping-bag.png';

const Header = function ({ text }) {
  return (
    <div className="header">
      <button type="button" className="header-back">
        <img alt="back" src={arrow} className="header-img" />
      </button>
      <span className="header-text">{text}</span>
      <img className="header-cart" src={cart} alt="cart" />
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
