/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

import React, {useState} from 'react';
import {QrReader} from 'react-qr-reader';
// import Kiosk from './Kiosk';
import { Link } from 'react-router-dom';
import styles from './Scanner.css';

function Scanner() {
	const [scanResultWebCam, setScanResultWebCam] = useState('');

	const handleErrorWebCam = (error) => {
		// eslint-disable-next-line
		console.log(error);
	}

	const handleScanWebCam = (result) => {
		if(result) {
			// 페이지 이동 코드 추가 (result도 같이 전달)
			setScanResultWebCam(result);
			<Link to={`/Kiosk/Payment/`} state={{qrvalue: result}} />
		}
	}

	return (
		<div className={styles.container}>
			<div className='Scanner-bar'>Scan QR Code</div>
			<h4 className='Scanner-WebCam-message'>QRCode Scan By WebCam</h4>
			<QrReader
			delay={300}
			style={{width: '100%'}}
			onError={handleErrorWebCam}
			onScan={handleScanWebCam}
			/>
			<div className='Scanner-message'>발급 받으신 QR 코드를<br /> 카메라에 맞춰 스캔해주세요!</div>
			<h3>Scanned By WebCam Code: {scanResultWebCam}</h3>	
		</div>
	);
}


export default Scanner;