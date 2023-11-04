/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import './css/Option.css';
import axios from 'axios';

const Option = function ({ item, onClose, setCarttext }) {
  const [optionList, setOptionList] = useState([]);
  const [radio, setRadio] = useState('');

  useEffect(() => {
    axios
      .get(`/api/v1/store/optionMenus/${item.id}`, {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        const arr = response.data.optionMenus;
        setOptionList(arr.length ? arr : []);
        setRadio(arr.length ? arr[0] : '');
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const onClickCart = () => {
    let arr = JSON.parse(localStorage.getItem('shoppingCart'));

    if (arr === null) {
      arr = [];
    }

    const pushItem = {
      ...item,
      option: {
        id: radio.id,
        name: radio.name,
        price: radio.price,
      },
      quantity: 1,
    };
    arr.push(pushItem);

    const newArray = arr.reduce((acc, current) => {
      if (
        acc.findIndex(
          ({ id, option }) =>
            id === current.id && option.id === current.option.id
        ) === -1
      ) {
        acc.push(current);
      }
      return acc;
    }, []);

    localStorage.setItem('shoppingCart', JSON.stringify(newArray));
    onClose();
    setCarttext();
  };
  const onChange = (elem) => {
    setRadio(elem);
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
          src={`/api/v1/image/1/${item.id}`}
          alt="americano"
        />
        <div className="option-beverage">{item.name}</div>
        <div className="option-sort">
          <div className="option-name">가격</div>
          <div className="option-price">
            {optionList.length > 0
              ? optionList.map((e) => (
                  <label className="option-price-radio">
                    <input
                      type="radio"
                      name="price"
                      value={e.id}
                      checked={radio.id === e.id}
                      onChange={() => onChange(e)}
                    />
                    <div className="option-price-text">
                      <span>{e.name}</span>
                      <span>{`${e.price.toLocaleString()}원`}</span>
                    </div>
                  </label>
                ))
              : ''}
          </div>
        </div>
      </div>
      <div className="option-btn">
        <button type="button" className="option-btn-cart" onClick={onClickCart}>
          장바구니 담기
        </button>
        <Link
          to="/qr"
          state={{
            item: {
              ...item,
              option: {
                id: radio.id,
                name: radio.name,
                price: radio.price,
              },
              quantity: 1,
            },
          }}
          className="option-btn-qr"
        >
          주문QR 받기
        </Link>
      </div>
    </div>
  );
};

Option.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setCarttext: PropTypes.func.isRequired,
};

export default Option;
