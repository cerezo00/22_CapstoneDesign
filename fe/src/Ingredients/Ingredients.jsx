/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import './css/Ingredients.css';

const data = {
  tags: [
    {
      id: 1,
      name: '아이스',
    },
    {
      id: 2,
      name: '샷',
    },
    {
      id: 3,
      name: '우유',
    },
  ],
};

const Ingredients = function () {
  const [checkedArr, setCheckedArr] = useState([]);

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
        {data.tags.map((item) => (
          <label key={item.id} className="ingredients-checkbox">
            <input
              className="ingredients-check"
              type="checkbox"
              value={item.name}
              onChange={(e) => onCheckElement(e.target.checked, item.id)}
              checked={checkedArr.includes(item.id)}
            />
            <span
              className={
                checkedArr.includes(item.id)
                  ? 'ingredients-check-btn__checked'
                  : 'ingredients-check-btn'
              }
            >
              {item.name}
            </span>
          </label>
        ))}
      </div>
      <Link to="/search" className="ingredients-search-btn">
        상품 검색하기
      </Link>
    </div>
  );
};

export default Ingredients;
