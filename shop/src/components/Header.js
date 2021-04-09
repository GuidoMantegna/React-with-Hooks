import React, {Fragment} from 'react';
import './styles/Header.css';
import Logo from '../images/avocado.png'

function Header (props) {
    return (
        <Fragment>
            <div className="header-container">
                <div className="logo-container">
                    <img src={Logo} className="logo"/>
                    <p className="logo-txt">FULL <br/><span>FR</span>IDGE</p>
                </div>
                <div className="title-container">
                    <h1 className="header-title">Welcome to the biggest food<br/>market in the net.</h1>
                </div>
                {/* <div className="cart"></div> */}
            </div>
        </Fragment>
        
    )
};

export default Header;