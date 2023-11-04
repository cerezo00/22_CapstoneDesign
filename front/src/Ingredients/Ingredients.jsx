/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import './css/Ingredients.css';

const Ingredients = function () {
  const [tags, setTags] = useState([]);
  const [checkedArr, setCheckedArr] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/store/tags/1', {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        setTags(response.data.tags);
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  const onCheckElement = (checked, id) => {
    if (checked) {
      setCheckedArr([...checkedArr, id]);
    } else {
      setCheckedArr(checkedArr.filter((el) => el !== id));
    }
  };

  return (
    <div className="ingredients">
      <Header text="재료 선택" />
      <div className="ingredients-text">
        원하는 재료가 들어간 상품을 검색해보세요.
      </div>
      <div className="ingredients-body">
        {tags.map((item) => (
          <label key={item.id} className="ingredients-checkbox">
            <input
              className="ingredients-check"
              type="checkbox"
              value={item.name}
              onChange={(e) => onCheckElement(e.target.checked, item.id)}
              checked={checkedArr.includes(item.id)}
            />
            <div
              className={
                checkedArr.includes(item.id)
                  ? 'ingredients-check-btn__checked'
                  : 'ingredients-check-btn'
              }
            >
              {item.name}
            </div>
          </label>
        ))}
      </div>
      <Link
        to="/search"
        state={{ tags: checkedArr }}
        className="ingredients-search-btn"
      >
        상품 검색하기
      </Link>
    </div>
  );
};

export default Ingredients;
