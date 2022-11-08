import { useState } from "react";
import { useCookies } from "react-cookie";

// menuId, name, price, option
function Cookie() {
    const [datas, setDatas] = useState([
        [
            "1",
            '아메리카노',
            '4,500원',
            'ICE',
        ],
    ]);

    // 임의로 지정한 것
    const data = ['2', '카페라떼', '5,000원', 'ICE'];

    // 메뉴 정보를 추가 저장한다.
    setDatas(datas.concat(data));

    // 문자열로 바꾼 추가한 메뉴
    const [text, setText] = useState('');
    const addMenu = data.join(" ");
    setText(addMenu);

    const [cookies] = useCookies(['']);

};
export default Cookie;