import React from "react";
import QRCode from "qrcode.react";
import Header from "../components/Header";
import QRButton from "./QRButton";
import "./QRButton.css";
import "../components/css/Header.css";
import "./QrBox.css";
// import QRImage from "./QRImage";

const datas = [
    [
        "1",
        '아메리카노',
        '4,500원',
        'ICE',
    ],
    [   
        "2",
        '카페 라떼',
        '5,000원',
        'ICE',
    ],
];

function QrBox() {
    const str = datas.join(" "); // 받은 메뉴들을 공백을 기준으로 한 문자열로
    // eslint-disable-next-line
    console.log(str);
    return(
        <div className="QrBox-container">
            <Header text="QR 발급" />
            <div className="QrBox-message">
                <div className="QrBox-payment">
                    결제하기
                </div>
                <div className="QrBox-scan">
                    QR을 리더기에 스캔해주세요.
                </div>
                <div className="QrBox-guide">
                    <span className="QrBox-span">
                        키오스크 또는 직원
                    </span>을 통해 QR로 결제하세요!<br/>
                </div>
                <div className="QrBox-QR-container">
                <QRCode className="QrBox-QRcode" id = "qr-gen" size={200} value={str} includeMargin="true"/>
                </div>
                </div>
            <QRButton />
        </div>
    );
}
export default QrBox;