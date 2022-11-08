import React from "react";
import {MobileView, BrowserView} from 'react-device-detect';
import OrderButton from "./components/OrderButton";
import ShopName from "./components/ShopName";

function Start() {
    return (
        <div>
            <MobileView>
                <ShopName/>
                <OrderButton/>
            </MobileView>
            <BrowserView>
                <ShopName/>
                <OrderButton/>
            </BrowserView>
        </div>
    );
}

export default Start;