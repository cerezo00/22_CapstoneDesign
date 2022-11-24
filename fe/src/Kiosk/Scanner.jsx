/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import React from 'react';
import QrReader from 'react-web-qr-reader';
import { useNavigate } from 'react-router-dom';
import styles from './Scanner.css';

function Scanner() {
	// const [scanResultWebCam, setScanResultWebCam] = useState('');
	const navigate = useNavigate();

	const handleErrorWebCam = (error) => {
		// eslint-disable-next-line
		console.log(error);
		// eslint-disable-next-line
		alert(error);
	}

	const handleScanWebCam = (result) => {
		if(result) {
			// eslint-disable-next-line
			// alert(result);
			// const data = JSON.parse(result);
			// setScanResultWebCam(result);
			// eslint-disable-next-line
			// alert(data);
			
			navigate('/kiosk', {state: result});

			// <Link to= {{
			// 	pathname: '/kiosk', state: {qrvalue: result}
			// }} /> // 페이지 이동, 이동 시 데이터 전송
		}
	}

	return (
		<div className={styles.container}>
			<div className='Scanner-bar'>Scan QR Code</div>
			<h4 className='Scanner-WebCam-message'>QRCode Scan By WebCam</h4>
			<QrReader className="qrscanner"
			delay={300}
			style={{width: '100%'}}
			onError={handleErrorWebCam}
			onScan={handleScanWebCam}
			facingMode='user'
			/>
			<div className='Scanner-message'>발급 받으신 QR 코드를<br /> 카메라에 맞춰 스캔해주세요!</div>
		</div>
	);
}

// 	<h3>Scanned By WebCam Code: {scanResultWebCam}</h3>	
export default Scanner;