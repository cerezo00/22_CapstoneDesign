import React from "react";
import TopBar from "./TopBar"
import SideBar from "./SideBar";
import './SideBar.css';
import './TopBar.css';

function Main() {
    return(
        <div>
            <TopBar />
            <div className="container">
                <SideBar />
                <div className="others">others pages</div>
            </div>
        </div>
    );
}

export default Main;