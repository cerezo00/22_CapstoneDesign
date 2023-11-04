import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Header from '../components/Header';
import Product from '../components/Product';
import Option from '../components/Option';
import './Menus.css';
import CartButton from '../components/CartButton';

const Menus = function () {
  const { id } = useParams();
  const { state } = useLocation();
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({});
  const [beverage, setBeverage] = useState([]);
  const [cartText, setCartText] = useState(false);

  const showText = () => {
    setCartText(true);
    setTimeout(() => setCartText(false), 2000);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/store/menus/${id}`, {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        setBeverage(response.data.menus);
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const setOption = (e) => {
    setClickedItem(e);
    setOptionOpen(true);
  };
  return (
    <div className={isOptionOpen ? 'menus-option' : 'menus'}>
      <div
        className={
          isOptionOpen ? 'menus-background__black' : 'menus-background'
        }
      >
        <Header text={state.name} />
        <div className="menus-list">
          {beverage.map((item) => (
            <Product
              key={item.id}
              item={item}
              onClick={() => setOption(item)}
            />
          ))}
        </div>
      </div>
      <div className="menu-option">
        {isOptionOpen && (
          <Option
            item={clickedItem}
            onClose={() => setOptionOpen(false)}
            setCarttext={() => showText()}
          />
        )}
      </div>
      <CartButton cartText={cartText} />
    </div>
  );
};

export default Menus;
