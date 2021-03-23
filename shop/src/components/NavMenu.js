import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles/NavMenu.css';

function NavMenu ( { onClick, containerClass, linkClass } ) {

    return (
        <Fragment>
            <div className={containerClass}>
                <Link to="/home" onClick={onClick} className="link">
                    <p className={linkClass}> <i className="bi bi-house-fill ico-link"></i> HOME </p>
                </Link>
                <Link to="/myfridge" onClick={onClick} className="link">
                    <p className={linkClass}> <i className="bi bi-door-closed ico-link"></i> MY FRIDGE </p>
                </Link>
                <Link to="/market" onClick={onClick} className="link">
                    <p className={linkClass}> <i className="bi bi-shop ico-link"></i> THE MARKET </p>
                </Link>
                <Link to="/tips" onClick={onClick} className="link">
                    <p className={linkClass}> <i className="bi bi-journal-bookmark ico-link"></i> FOOD TIPS </p>
                </Link>
                <Link to="/contact" onClick={onClick} className="link">
                    <p className={linkClass}> <i className="bi bi-envelope ico-link"></i>CONTACT US </p>
                </Link>
            </div>
        </Fragment>
        
    )
};

export default NavMenu;