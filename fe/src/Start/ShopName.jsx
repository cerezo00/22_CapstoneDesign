import React from 'react';
// import styled from 'styled-components';
import logo from './img/starbucks_logo.webp';
// import logo from './img/star.png';

// const image = require('./img/EDIYA_COFFEE.jpg');

const styles = {
    imgStyle: {
        // width: '40%',
        // display: 'block',
        width: '100%',
        objectFit: 'scale-down',
        verticalAlign: 'top',
    },
    div: {
        display: 'flex',
        width: '100%',
        // height: '37vh',
        height: 'auto',
        justifyContent: 'center',
        overflowY: 'hidden',
        
    },
};

function ShopName() {

    return (
        <div style={styles.div}>
            <img src={logo} alt="ShopImage" style={styles.imgStyle}/>
        </div>
    );
}

export default ShopName;