import React from 'react';
// import styled from 'styled-components';
import logo from './img/EDIYA_COFFEE.jpg'

// const image = require('./img/EDIYA_COFFEE.jpg');

const styles = {
    imgStyle: {
        // width: '40%',
        display: 'block',
    },
    div: {
        display: 'flex',
        float: 'clear',
        justifyContent: 'center',
        position:'relavive',
        bottom: '70%',
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