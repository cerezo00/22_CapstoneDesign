import React from "react";
// import { useState } from "react";
// import { useCallback } from "react";

const storeName = 'StarBucks';

const orderButtons = [
    {
        id: 1,
        name: "재료로 주문 >",
    },
    {
        id: 2,
        name: "직접 주문 >",
    },
    {
        id: 3,
        name: "주문 부탁 >" ,
    },
];

const styles = {
    storeName: {
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '90%',
        height: '7vh',
        textAlign: "center",
        margin: '1vh auto',
        backgroundColor: 'white',
        fontSize: '130%',
        borderRadius: '50px',
        verticalAlign: 'bottom',
        borderColor: '#0c6234',
        fontWeight: 'bold',
        borderWidth: '0.1rem',
        
    },
    divContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    welcomText: {
        fontSize: '110%',
        textAlign: 'center',
        margin: '3vw',
        padding: '1.5rem',
        lineHeight: '2.5rem',
    },
    div: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '1vh',
    }
}

function OrderButton() {
    // 버튼 클릭 시 해당 페이지로 이동
    const handleClick = (event) => {
        if(event.target.value === "1") {
            window.location.href=""
        } else if(event.target.value === "2") {
            window.location.href=""
        } else if(event.target.value === "3") {
            event.preventDefault();
            navigator.share({
                title: document.title,
                text: 'Capstone', // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
                url: 'https://capston',  // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
              });
        }
        
    };

    // 버튼이 포커스되면 색깔 변경
    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#0c6234'
        e.target.style.color = 'white'
    };

    // 버튼 포커스가 사라지면 원래 색으로 변경
    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'white'
        e.target.style.color = 'black'
    };

    // map으로 버튼 3개 출력
    const listButton = orderButtons.map((orderButton) =>
    <button type="button" 
            key={orderButton.id} 
            onClick={handleClick}
            value={orderButton.id}
            style={styles.buttonContainer}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseOver}>
        {orderButton.name}
        </button>
    );

    return (
        <div style={styles.div}>
            <p style={styles.welcomText}>
                <span style={styles.storeName}>{storeName}<br/></span>
                <span style={{fontSize:'130%'}}>어서오세요!</span><br/>
                주문 방식을 선택해주세요</p>
            <div style={styles.divContainer}>{listButton}</div>
        </div>
    );
}

export default OrderButton;