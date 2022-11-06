import React from "react";
// import { useCallback } from "react";

const orderButtons = [
    {
        id: 1,
        name: "태그 주문 >",
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
    buttonContainer: {
        width: '90%',
        height: '6rem',
        textAlign: "center",
        margin: '1rem auto',
        backgroundColor: 'white',
        fontSize: '2.3rem',
        borderRadius: '50px',
        verticalAlign: 'top',
        borderColor: '#DDDDDD',
        fontFamliy: 'Verdana',
        fontWeight: 'bold',
        borderWidth: '0.1rem',
        
    },
    divContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    welcomText: {
        fontSize: '1.2rem',
        textAlign: 'center',
        margin: '3rem',
        padding: '1.5rem',
        lineHeight: '3rem',
    },
}

function OrderButton() {

    // 버튼 클릭 시 해당 페이지로 이동
    const handleClick = () => {
        window.location.href=""
    };

    // 버튼이 포커스되면 색깔 변경
    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#EBECF0'
    };

    // 버튼 포커스가 사라지면 원래 색으로 변경
    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'white'
    };

    // map으로 버튼 3개 출력
    const listButton = orderButtons.map((orderButton) =>
    <button type="button" 
            key={orderButton.id} 
            onClick={handleClick} 
            style={styles.buttonContainer}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseOver}>
        {orderButton.name}
        </button>
    );

    return (
        <div>
            <p style={styles.welcomText}><span style={{fontSize:'1.7rem'}}>어서오세요!</span><br/>주문 방식을 선택해주세요</p>
            <div style={styles.divContainer}>{listButton}</div>
        </div>
    );
}

export default OrderButton;