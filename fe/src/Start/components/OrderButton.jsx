import React from "react";
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined'; // 주문 부탁
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined'; // 손 터치
import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
import "./OrderButton.css";
import { Link } from 'react-router-dom';


function OrderButton() {
    // const storeName = 'StarBucks';

    const handleClick = (event) => {
        if(event.target.value === "1") {
            event.preventDefault();
            navigator.share({
                title: document.title,
                text: 'Capstone', // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
                url: 'https://capston',  // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
              });
        } 
        else if(event.target.value === "2") {
            <Link to="/menus" />
        } 
        else if(event.target.value === "3") {
            window.location.href=""
        }
        
    };

    return(
        <div className="StartButton-container">
            <button className="StartButton-orderbutton" type="button" value="1" onClick={handleClick} id="StartButton-help">
                <PersonPinOutlinedIcon className="StartButton-buttonicon"/> <br /> 주문 부탁
            </button>
            <div className="StartButton-button-container">
                <button className="StartButton-orderbutton" type="button" value="2" onClick={handleClick} id="direct">
                    <PanToolAltOutlinedIcon className="StartButton-buttonicon" /><br /> 직접 주문
                </button>
                <button className="StartButton-orderbutton" type="button" value="3" onClick={handleClick} id="tag">
                    <EggOutlinedIcon className="StartButton-buttonicon" /> <br /> 재료로 주문
                </button>
            </div>
        </div>
    );
}

export default OrderButton;