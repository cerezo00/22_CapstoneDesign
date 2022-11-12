/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import '../css/CartItem.css';

const CartItem = function ({ item, onClick, onChangeQuantity }) {
  const { menu_id, name, img, quantity, option } = item;
  const onIncrease = () => {
    onChangeQuantity(menu_id, option, quantity + 1);
  };
  const onDecrease = () => {
    onChangeQuantity(menu_id, option, quantity - 1);
  };
  return (
    <div className="cart-item">
      <img
        className="cart-item-img"
        src={`images/${img}.jpg`}
        alt="americano"
      />
      <div className="cart-item-info">
        <button
          type="button"
          className="cart-item-delete"
          value={name}
          onClick={onClick}
        >
          X
        </button>
        <span className="cart-item-name">{name}</span>
        <span className="cart-item-option">{`가격: ${option.name}`}</span>
        <div className="cart-item-bottom">
          <div className="cart-item-quantity">
            <button
              className="cart-item-quantity-btn"
              type="button"
              disabled={quantity < 2}
              onClick={onDecrease}
            >
              -
            </button>
            <span className="cart-item-quantity-text">{quantity}</span>
            <button
              className="cart-item-quantity-btn"
              type="button"
              onClick={onIncrease}
            >
              +
            </button>
          </div>
          <span className="cart-item-price">{`${(option.price * quantity)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원`}</span>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
};

export default CartItem;
