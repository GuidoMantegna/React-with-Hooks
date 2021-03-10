import React, {Fragment} from 'react';
import './styles/Header.css';

function Header (props) {
    return (
        <Fragment>
            <div className="header-container">
                <div className="logo"></div>
                <div className="search-bar"></div>
                <div className="cart"></div>
            </div>
        </Fragment>
        
    )
};

export default Header;