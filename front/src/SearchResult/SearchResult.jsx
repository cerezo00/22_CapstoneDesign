import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Product from '../components/Product';
import Option from '../components/Option';

import '../Menus/Menus.css';

const SearchResult = function () {
  const { state } = useLocation();
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({});
  const [beverage, setBeverage] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/store/menus?tagIDs=${state.tags}`, {
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
        <Header text="검색 결과" />
        <div className="menus-list">
          {beverage.map((item) => (
            <Product
              key={item.menu_id}
              item={item}
              onClick={() => setOption(item)}
            />
          ))}
        </div>
      </div>
      <div className="order-option">
        {isOptionOpen && (
          <Option item={clickedItem} onClose={() => setOptionOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default SearchResult;
