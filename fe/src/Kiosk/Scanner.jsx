/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */

// import { TextareaAutosize } from '@mui/material';
import React, {useState} from 'react';
import {QrReader} from 'react-qr-reader';

import styles from './Scanner.css';


// const Scanner = () => {}
function Scanner() {
    const [result, setResult] = useState('No result');

	const handleError = (err) => {
        // eslint-disable-next-line
		console.err(err)
	}

	const handleScan = (results) => {
		if(results){
			setResult(results)
		}
	}

	const previewStyle = {
		height: 240,
		width: 320,
	}

	return (
		<div className={styles.container}>
			<QrReader
			delay={500}
			style={previewStyle}
			onError={handleError}
			onScan={handleScan}
			/>
			<div className={styles.result}>{result}</div>		
		</div>
	);
}

export default Scanner;