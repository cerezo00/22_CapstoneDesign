import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import './css/Header.css';
import arrow from './img/arrow-left.png';
import cart from './img/shopping-bag.png';

const Header = function ({ text }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div>
        <button
          type="button"
          className="header-back"
          onClick={() => navigate(-1)}
        >
          <img alt="back" src={arrow} className="header-img" />
        </button>
        <span className="header-text">{text}</span>
      </div>
      <Link to="/cart">
        <img className="header-cart" src={cart} alt="cart" />
      </Link>
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
