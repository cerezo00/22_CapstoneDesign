import React from "react";
import "./QRButton.css";
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';
// import html2canvas from 'html2canvas';
// import PropTypes from 'prop-types';
// import canvasToImage from 'canvas-to-image';

const QRButton = function () {
    const now = new Date();
    const year = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();

    const downloadQRCode = () => {
        const canvas = document.getElementById("qr-gen");

        const pngUrl = canvas.toDataURL("image/png")

        const downloadLink = document.createElement("a");

        downloadLink.href = pngUrl;
        downloadLink.download = `${year}/${todayMonth}/${todayDate}/QRCode.png`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        // eslint-disable-next-line
        console.log(pngUrl);
    };

    async function shareCanvasAsImage() {
        // Get canvas as dataURL
        const dataUrl = document.getElementById('qr-gen').toDataURL()
      
        // Convert dataUrl into blob using browser fetch API
        const blob = await (await fetch(dataUrl)).blob()
      
        // Create file form the blob
        const image = new File([blob], `${year}/${todayMonth}/${todayDate}/QRCode.png`, { type: blob.type })
      
        // Check if the device is able to share these files then open share dialog
        if (navigator.canShare && navigator.canShare({ files: [image] })) {
          try {
            await navigator.share({
              files: [image],         // Array of files to share
              title: 'Share QR Code'  // Share dialog title
            })
          } catch (error) {
            // eslint-disable-next-line
            console.log('Sharing failed!', error)
          }
        } else {
            // eslint-disable-next-line
          console.log('This device does not support sharing files.')
        }
      }
    
    return(
        <div className="QR-div-container">
            <div className="QR-button-container">
                <button className="QR-orderbutton" id="save" type="button" value="1" onClick={downloadQRCode}>
                    <QrCodeIcon className="QR-buttonicon" id="icon"/><br /><span id="span">QR 저장</span>
                </button>
                <button className="QR-orderbutton" id="share" type="button" value="2" onClick={shareCanvasAsImage}>
                    <ShareIcon className="QR-buttonicon" id="icon"/><br /><span id="span">QR 공유</span>
                </button>
            </div>
        </div>
    );
}

export default QRButton;