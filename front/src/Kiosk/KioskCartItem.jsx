/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import '../Cart/css/CartItem.css';

const CartItem = function ({ item, onClick, onChangeQuantity }) {
  const { id, name, quantity, option } = item;
  const onIncrease = () => {
    onChangeQuantity(id, option, quantity + 1);
  };
  const onDecrease = () => {
    onChangeQuantity(id, option, quantity - 1);
  };
  return (
    <div className="cart-item">
      <img
        className="cart-item-img"
        src={`/api/v1/image/1/${id}`}
        alt="americano"
      />
      <div className="cart-item-info">
        <button
          type="button"
          className="cart-item-delete"
          onClick={() => onClick(id, option.id)}
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
          <span className="cart-item-price">{`${(
            option.price * quantity
          ).toLocaleString()}원`}</span>
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
