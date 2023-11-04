import React  from "react";
// import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined'; // 주문 부탁
// import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined'; // 손 터치
// import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
import "./OrderButton.css";
import { Link } from 'react-router-dom';
import ingredient from '../img/healthy-food.png';
import direct from '../img/order-food.png';
import request from '../img/file-transfer.png';


function OrderButton() {

    const handleClick = (event) => {;
        if(navigator.share) {
            event.preventDefault();
            navigator.share({
                title: "주문을 부탁하셨습니다!",
                text: "주문을 부탁하셨습니다!",
                url: 'https://semai.kro.kr',
              });
        }else {
            // eslint-disable-next-line
            alert("공유하기가 지원되지 않는 환경입니다/")
        }
    };
    return(
        <div className="StartButton-container">
            <Link to="/menus" className="StartButton-orderbutton" type="button" value="1" onClick={handleClick} id="StartButton-help" >
                <div className="imgContainer"><img src={request} alt="주문 부탁" className="StartButton-buttonicon"/></div> <br /> 주문 부탁
            </Link>
            <div className="StartButton-button-container">
                <Link to="/order" className="StartButton-orderbutton" type="button" value="2" id="direct">
                    <div className="imgContainer"><img src={direct} alt="직접 주문" className="StartButton-buttonicon" /></div><br /> 직접 주문
                </Link>
                <Link to="/tag" className="StartButton-orderbutton" type="button" value="3" id="tag">
                    <div className="imgContainer"><img src={ingredient} alt="재료로 주문" className="StartButton-buttonicon" /></div> <br /> 재료로 주문
                </Link>
            </div>
        </div>
    );
}

export default OrderButton;