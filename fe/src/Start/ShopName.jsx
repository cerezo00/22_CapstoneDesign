import React from 'react';
// import styled from 'styled-components';
import logo from './img/starbucks_logo.webp';
// import logo from './img/star.png';
// import logo from './img/EDIYA_COFFEE.jpg';

// const image = require('./img/EDIYA_COFFEE.jpg');

const styles = {
    imgStyle: {
        // width: '40%',
        display: 'block',
        width: '100%',
        objectFit: 'scale-down',
        // maxWidth: 'device-width',
    },
    div: {
        display: 'flex',
        Width: '100%',
        height: '37vh',
        justifyContent: 'center',
        overflow: 'hidden',
        
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