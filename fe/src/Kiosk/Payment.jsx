import React from "react";
import './Payment.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

function Payment() {
    const ordernumber = 100;
    const handleClick = () => {
    <Link to="/scanner" />
    }

    return(
        <div className="Payment-container">
            <div className="Icon-container">
                <CheckCircleIcon id="Payment-checkIcon"/>
            </div>
            <div className="Payment-payment-message">결제에 성공하였습니다</div>
            <div className="ordernumber">주문번호 &nbsp;&nbsp; {ordernumber}</div>
            <button type="button" onClick={handleClick} className="Payment-back">&lt;&nbsp;&nbsp;&nbsp;돌아가기</button>
        </div>
    );
}

export default Payment;