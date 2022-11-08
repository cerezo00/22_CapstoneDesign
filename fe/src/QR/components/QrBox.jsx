import React from "react";
import QRCode from "react-qr-code";
import ShareIcon from '@mui/icons-material/Share';
// import SaveAltIcon from '@mui/icons-material/SaveAlt';
// import { useCookies } from "react-cookie";

const styles = {
    message: {
        fontSize: '110%',
        height: '100%',
        textAlign: "center",
        position: 'relative',
        top: '12vh',
        lineHeight: '2rem',
    },
    code: {
        fontWeight: 'bold',
        marginTop: '5%',
        fontSize:'110%',
        },
    divContainer: {
        width: '100%',
    },
    qr: {
        marginTop: '4%',

    },
    span: {
        display: 'inline-block',
        width: '100%',
        color:'#0c6234',
        fontWeight: 'bold',
    },
    share: {
        fontSize: '250%',
        position: 'absolute',
        top: '80%',
        marginLeft: '2%',
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

function QrBox() {
    const handleClick = (event) => {
            event.preventDefault();
            navigator.share({
                title: document.title,
                text: 'Capstone', // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
                url: 'https://capston',  // 수정필요 (공유는 https 환경에서만 가능, 로컬 http는 불가능)
              });
        }
        
    

    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#0c6234'
        e.target.style.color = 'white'
    };

    const handleMouseLeave = (e) => {
        e.target.style.backgroundColor = 'white'
        e.target.style.color = 'black'
    };
    // eslint-disable-next-line
    console.log(str);
    return (
        <div>
            <div style={styles.message}><span style={styles.span}>키오스크 또는 직원을 통해 QR로 결제하세요!</span><br/>
                <div style={styles.code}>QR Code</div>
                <QRCode size={200} style={styles.qr} value={str} />
                <ShareIcon style={styles.share} datatestid={ShareIcon} onClick={handleClick}/>
            </div>
            <div style={styles.buttonDiv}>
                <button type="button" style={styles.buttonContainer} onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave} onFocus={handleMouseOver}>QR 저장하기
                </button>
            </div>
        </div>
    );
};

//             <div><SaveAltIcon style={styles.save} datatestid={SaveAltIcon}/></div>

export default QrBox;