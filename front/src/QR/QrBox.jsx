import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Header from '../components/Header';
import QRButton from './QRButton';
import './QRButton.css';
import '../components/css/Header.css';
import './QrBox.css';

/*
const datas = [
    {
        menu_id: 1,
        name: '아메리카노',
        img: 'americano',
        quantity: 1,
        option: {
            name: 'ICE',
            price: 4500,
          },
        price: 4500,
    },
    { 
        menu_id: 2,
        name: '카페 라떼',
        img: 'caffelatte',
        quantity: 1,
        option: {
            name: 'ICE',
            price: 5000,
          },
        price: 5000,
    },
];
*/

function QrBox() {
  const [items, setItems] = useState('');
  const { state } = useLocation();
  // eslint-disable-next-line
  console.log(state);

  useEffect(() => {
    if (state == null) {
      setItems(localStorage.getItem('shoppingCart'));
      // setItems(JSON.stringify(datas));
    } else {
      setItems(JSON.stringify([state.item]));
    }
  }, []);

  // eslint-disable-next-line
  console.log(JSON.stringify(items));
  // eslint-disable-next-line
  // console.log(JSON.parse(items));

  return (
    <div className="QrBox-container">
      <Header text="결제하기" />
      <div className="QrBox-message">
        <div className="QrBox-scan">QR을 리더기에 스캔해주세요.</div>
        <div className="QrBox-guide">
          <span className="QrBox-span">키오스크 또는 직원</span>을 통해 QR로
          결제하세요!
          <br />
        </div>
        <div className="QrBox-QR-container">
          <QRCode
            className="QrBox-QRcode"
            id="qr-gen"
            size={250}
            value={items}
            includeMargin="true"
          />
        </div>
      </div>
      <QRButton />
    </div>
  );
}

export default QrBox;
