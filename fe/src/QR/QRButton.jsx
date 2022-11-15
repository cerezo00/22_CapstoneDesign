import React from "react";
import "./QRButton.css";
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';


function QRButton() {
    const downloadQRCode = () => {
        const canvas = document.getElementById("qr-gen");

        const pngUrl = canvas.toDataURL("image/png") // .replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");

        downloadLink.href = pngUrl;
        downloadLink.download = "QR.png";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleClick = (event) => {
        if(event.target.value === "1") {
            event.preventDefault();
        } 
        else if(event.target.value === "2") {
            event.preventDefault();
            navigator.share({
                title: document.title,
                text: 'Capstone', // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
                url: 'https://capston',  // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
              });
        } 
    };

    return(
        <div className="QR-div-container">
            <div className="QR-button-container">
                <button className="QR-orderbutton" id="save" type="button" value="1" onClick={downloadQRCode}>
                    <QrCodeIcon className="QR-buttonicon" id="icon"/><br /><span id="span">QR 저장</span>
                </button>
                <button className="QR-orderbutton" id="share" type="button" value="2" onClick={handleClick}>
                    <ShareIcon className="QR-buttonicon" id="icon"/><br /><span id="span">QR 공유</span>
                </button>
            </div>
        </div>
    );
}

export default QRButton;