import React from 'react';
import './SideBar.css';
import ArticleIcon from '@mui/icons-material/Article'; // 처리중
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // 완료
import CategoryIcon from '@mui/icons-material/Category'; // 카테고리 관리
import FlatwareIcon from '@mui/icons-material/Flatware'; // 상품 관리
import TagIcon from '@mui/icons-material/Tag'; // 태그 관리
import QrCodeIcon from '@mui/icons-material/QrCode'; // qr 발급


function MainSideBar() {
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className='sidebarTitle'>주문 관리</h3>
                    <ul className="sidebarList">
                        <li className='sidebarListItem'>
                            <ArticleIcon className='sidebarIcon' />    
                            처리중
                        </li>
                        <li className='sidebarListItem'>
                            <AssignmentTurnedInIcon className='sidebarIcon' />
                            완료
                        </li>
                    </ul>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>상품 관리</h3>
                    <ul className="sidebarList">
                    <li className='sidebarListItem'>
                            <CategoryIcon className='sidebarIcon' />
                            카테고리 관리
                        </li>
                        <li className='sidebarListItem'>
                            <FlatwareIcon className='sidebarIcon' />
                            상품 관리
                        </li>
                        <li className='sidebarListItem'>
                            <TagIcon className='sidebarIcon' />
                            태그 관리
                        </li>
                    </ul>
                </div>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle'>매장 QR</h3>
                    <ul className="sidebarList">
                        <li className='sidebarListItem'>
                            <QrCodeIcon className='sidebarIcon' />
                            매장 QR 발급
                        </li>
                    </ul>
                </div>
            </div>
        </div>    
    );
}

export default MainSideBar;