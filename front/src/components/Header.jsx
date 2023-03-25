import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './css/Header.css';
import arrow from './img/arrow-left.png';

const Header = function ({ text }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button
        type="button"
        className="header-back"
        onClick={() => navigate(-1)}
      >
        <img alt="back" src={arrow} className="header-img" />
      </button>
      <span className="header-text">{text}</span>
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
