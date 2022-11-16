/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import '../css/Product.css';

const Product = function ({ item, onClick }) {
  const { name, tag, price, img } = item;
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
        <span className="product-price">{`${price.toLocaleString()}원`}</span>
      </div>
    </div>
  );
};

Product.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Product;
