import React, {useRef, useEffect, useState} from "react";
import QRCode from "qrcode.react";
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useCookies } from "react-cookie";
import "./QrBox.css"

// import {Share, View, Button} from 'react-native';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useCookies } from "react-cookie";

const styles = {
    top: {
        width: '100%',
        height: '4.5vh',
        backgroundColor: '#0c6234',
    },
    message: {
        fontSize: '110%',
        height: '100%',
        textAlign: "center",
        position: 'relative',
        top: '5vh',
        lineHeight: '2rem',
    },
    code: {
        fontWeight: 'bold',
        fontSize:'110%',
        },
    divContainer: {
        width: '100%',
    },
    qr: {
        marginTop: '2vh',
    },
    span: {
        display: 'inline-block',
        width: '100%',
        fontWeight: 'bold',
    },
    share: {
        fontSize: '250%',
        position: 'absolute',
        top: '60%',
        color: 'lightgrey',
    },
    buttonContainer: {
        width: '100%',
        height: '8vh',
        textAlign: "center",
        margin: ' auto',
        backgroundColor: 'white',
        fontSize: '140%',
        borderRadius: '15px',
        borderColor: '#0c6234',
        fontWeight: 'bold',
    },
    buttonDiv: {
        fontSize: '110%',
        position: 'fixed',
        bottom: '15%',
        left: '0',
        right: '0',
        margin: 'auto auto',
        width: '90%',
    },
    save: {
        position: 'relative',
        width: '60%',
        margin: '0',
        padding: '0',
    },
    back: {
        fontSize: '10vw',
        height: '90%',
        color: 'white',
    }
}

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

// QR과 쿠키는 문자열만 받는다. 메뉴를 공백을 기준으로 구분
const str = datas.join(" ");
// eslint-disable-next-line
console.log(str);

function QrBox() {

    // Cookie
    const [cookies, setCookie] = useCookies(['rememberText']);
    const [text, setText] = useState('');

    const now = new Date;
    const after1m = new Date();

    useEffect(() => {
        if(cookies.rememberText !== undefined) {
            setText(cookies.rememberText);
        }
         // eslint-disable-next-line
    }, []);

    const handleAddButtonClick = (e) => { // 최근 주문 내역에 추가 버튼 클릭시 활성되는 함수
        e.preventDefault();

        setText(datas.join(" ")) // text를 입력받은 메뉴들 정보로 재정의
        after1m.setDate(now.getDate() + 7);  // 쿠키 만료일을 7일 뒤로 정의
        setCookie('rememberText', text, {path: '/', expires:after1m});
        // remeberText에 text라는 값을 넣는다.
        // path는 적용되는 도메인
        // expires = 만료시간은 1분뒤
         // eslint-disable-next-line
        console.log(text);
    }

    // const output = document.getElementById('output')
    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#0c6234'
        e.target.style.color = 'white'
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'white'
        e.target.style.color = 'black'
    };

    // 이미지를 다운받는다.
    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");

        const pngUrl = canvas.toDataURL("image/png") // .replace("image/png", "image/octet-stream");

        const downloadLink = document.createElement("a");

        downloadLink.href = pngUrl;
        downloadLink.download = "QR.png" // `${str}.png`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const imageInput = useRef();

    // 일단 파일 선택 기능만 되는 상태
    const handleClick = (event) => {
        // Generate download with use canvas and stream
        event.preventDefault();
        
        const files = imageInput.current.click();
        if (navigator.canShare({ files })) {
            try {
              navigator.share({
              files,
              title: 'Images',
              text: 'Beautiful images'
            })
            } catch (error) {
                // eslint-disable-next-line
                console.log("no");
            }
        }
    }
      
    /**
    const onClickInput = (event) => {
        event.preventDefault();
        // const files = imageInput.current.click();
        let files = null;
        do {
            files = imageInput.current.click(); 
        } while(files != null)

        handleClick(files);
    }
    */

    return (
        <div>
            <div style={styles.top}><KeyboardBackspaceIcon datatestid={KeyboardBackspaceIcon} style={styles.back}/></div>
            <div style={styles.message}>
                <div style={{color:"#0c6234", fontWeight:"bold", fontSize: "120%", marginBottom: "2ch"}}>
                    결제하기
                </div>
                <div style={{fontWeight: "bolder", fontSize: "130%", marginBottom: "1vh"}}>
                    QR을 리더기에 스캔해주세요.
                </div>
                <div style={styles.span}>
                    <span style={{color:"#ff5232"}}>
                        키오스크 또는 직원
                    </span>을 통해 QR로 결제하세요!<br/>
                </div>
                <QRCode id = "qr-gen" size={200} styles={styles.qr} value={str} includeMargin="true"/>
                <input type="file" accept="image/*" ref={imageInput} style={{display: "none"}}/>
                <ShareIcon style={styles.share} datatestid={ShareIcon} onClick={handleClick}/>
                <div style={styles.code}>
                    QR Code&nbsp;&nbsp;
                    <SaveAltIcon datatestid={SaveAltIcon} onClick={downloadQRCode}/>
                </div>
            </div>
            <div style={styles.buttonDiv}>
                <button type="button" style={styles.buttonContainer} onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} onFocus={handleMouseOver} onClick={handleAddButtonClick}>
                    최근 주문 내역에 추가
                </button>
            </div>
        </div>
    );
};

export default QrBox;