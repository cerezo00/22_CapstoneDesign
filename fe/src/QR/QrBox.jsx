import React, {useRef} from "react";
import QRCode from "qrcode.react";
// import Header from "../components/Header";
import QRButton from "./QRButton";
import "./QRButton.css";
import "../components/css/Header.css";
import "./QrBox.css";
// import QRImage from "./QRImage";

const datas = [
    {
        menu_id: 1,
        name: '아메리카노',
        img: 'americano',
        quantity: 1,
        option: 'ICE',
    },
    { 
        menu_id: 2,
        name: '카페 라떼',
        img: 'caffelatte',
        quantity: 1,
        option: 'ICE',
    },
];
// <Header text="QR 발급" />
function QrBox() {
    const str = JSON.stringify({
        datas
    })
    // eslint-disable-next-line
    console.log(str);

    const imageRef = useRef(null);

    const handleShare = async () => {
        const newFile = await imageRef.current.toBlob();
        const data = {
            files: [
                new File([newFile], 'image.png', {
                    type: newFile.type,
                }),
            ],
            title: 'Image',
            text: 'image',
        };
        try {
            if(!navigator.canShare(data)) {
                // eslint-disable-next-line
                console.error("Can't share");
            }
            await navigator.share(data);
        }catch(err) {
            // eslint-disable-next-line
            console.error(err);
        }
    }

    return( 
        <div className="QrBox-container">
            
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
                <div className="QrBox-QR-container" ref={imageRef}>
                <QRCode className="QrBox-QRcode" id = "qr-gen" size={250} value={str} includeMargin="true"/>
                </div>
                </div>
            <QRButton onClick={handleShare}/>
        </div>
    );
}
export default QrBox;