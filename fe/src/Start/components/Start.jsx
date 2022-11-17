import React from 'react';
import './Start.css';
import OrderButton from './OrderButton';
import "./OrderButton.css";

function Start() {

    const storeName = "Starbucks";

    return (
        <div className="container">
            <div className="storename">{storeName}<br/></div>
            <OrderButton className="orderbutton"/>
        </div>
    );
}

export default Start;