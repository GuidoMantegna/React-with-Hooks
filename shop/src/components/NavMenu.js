import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/NavMenu.css';

function NavMenu ( { containerClass, linkClass, title, titleClassName, onClick, children } ) {

    return (
        <Fragment>
            <div className={containerClass}>

                {/* <div className="nav-title-container">

                <h2 className="navbar-title"><i className={titleClassName}></i>{title}</h2>
                </div> */}
                    {children}

                <div className="nav-links-container">
                    <Link to="/home" onClick={onClick} className="link">
                        <p className={linkClass} data-link="home"> <i className="bi bi-house-fill ico-link"></i> HOME </p>
                    </Link>
                    <Link to="/fridge" onClick={onClick} className="link">
                        <p className={linkClass} data-link="fridge"> <i className="bi bi-door-closed ico-link"></i> MY FRIDGE </p>
                    </Link>
                    <Link to="/market" onClick={onClick} className="link">
                        <p className={linkClass} data-link="market"> <i className="bi bi-shop ico-link"></i> THE MARKET </p>
                    </Link>
                    <Link to="/tips" onClick={onClick} className="link">
                        <p className={linkClass} data-link="tips"> <i className="bi bi-journal-bookmark ico-link"></i> FOOD TIPS </p>
                    </Link>
                    <Link to="/contact" onClick={onClick} className="link">
                        <p className={linkClass} data-link="contact"> <i className="bi bi-envelope ico-link"></i>CONTACT US </p>
                    </Link>
                </div>
                
            </div>
        </Fragment>      
    )
};

export default NavMenu;