import React from 'react';
// import styled from 'styled-components';
import logo from './img/starbucks_logo.webp';
// import logo from './img/star.png';
// import logo from './img/다운로드.jpg';

const styles = {
    imgStyle: {
        width: '100%',
        objectFit: 'scale-down',
        verticalAlign: 'top',
    },
    div: {
        display: 'flex',
        width: '100%',
        maxHeight: '32vh',
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