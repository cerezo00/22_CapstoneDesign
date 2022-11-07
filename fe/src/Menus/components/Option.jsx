/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import '../css/Option.css';

const data = [
  {
    option: 'ICE',
    price: '4,500원',
  },
  {
    option: 'HOT',
    price: '4,500원',
  },
];

const Option = function ({ onClose }) {
  const [radio, setRadio] = useState('ICE');

  const onChange = (e) => {
    setRadio(e.target.value);
  };
  return (
    <div className="option">
      <div className="option-content">
        <div className="option-header">
          <button type="button" className="option-close" onClick={onClose}>
            X
          </button>
        </div>
        <img
          className="option-img"
          src="images/americano.jpg"
          alt="americano"
        />
        <div className="option-beverage">아메리카노</div>
        <div className="option-sort">
          <div className="option-name">가격</div>
          <div className="option-price">
            {data.map((e) => (
              <label className="option-price-radio">
                <input
                  type="radio"
                  name="price"
                  value={e.option}
                  checked={radio === e.option}
                  onChange={onChange}
                />
                <div className="option-price-text">
                  <span>{e.option}</span>
                  <span>{e.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="option-btn">
        <button type="button" className="option-btn-cart">
          장바구니 담기
        </button>
        <button type="button" className="option-btn-qr">
          주문QR 받기
        </button>
      </div>
    </div>
  );
};

Option.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Option;
