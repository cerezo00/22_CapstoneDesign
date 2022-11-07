/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import '../css/Product.css';

const Product = function ({ name, tag, price, img, onClick }) {
  return (
    <div className="product" onClick={onClick}>
      <img
        className="product-img"
        src={`images/${img}.jpg`}
        alt="product img"
      />
      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-tag">{tag}</span>
        <span className="product-price">{price}</span>
      </div>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Product;
