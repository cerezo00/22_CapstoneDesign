/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import '../css/Option.css';

const data = [
  {
    id: 1,
    option: 'ICE',
    price: 4500,
  },
  {
    id: 2,
    option: 'HOT',
    price: 5000,
  },
];

const Option = function ({ item, onClose }) {
  const [radio, setRadio] = useState(data[0]);

  const onClickCart = () => {
    let arr = JSON.parse(localStorage.getItem('shoppingCart'));

    if (arr === null) {
      arr = [];
    }

    const pushItem = {
      ...item,
      option: {
        name: radio.option,
        price: radio.price,
      },
    };
    arr.push(pushItem);

    const newArray = arr.reduce((acc, current) => {
      if (
        acc.findIndex(
          ({ menu_id, option }) =>
            menu_id === current.menu_id && option.name === current.option.name
        ) === -1
      ) {
        acc.push(current);
      }
      return acc;
    }, []);

    localStorage.setItem('shoppingCart', JSON.stringify(newArray));
    onClose();
  };
  const onChange = (id) => {
    setRadio(data.find((elem) => elem.id === id));
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
        <div className="option-beverage">{item.name}</div>
        <div className="option-sort">
          <div className="option-name">가격</div>
          <div className="option-price">
            {data.map((e) => (
              <label className="option-price-radio">
                <input
                  type="radio"
                  name="price"
                  value={e.id}
                  checked={radio.id === e.id}
                  onChange={() => onChange(e.id)}
                />
                <div className="option-price-text">
                  <span>{e.option}</span>
                  <span>{`${e.price.toLocaleString()}원`}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="option-btn">
        <button type="button" className="option-btn-cart" onClick={onClickCart}>
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
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Option;
