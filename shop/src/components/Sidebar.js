import { Fragment } from 'react';
import './styles/Sidebar.css';
import NavMenu from './NavMenu';

function Sidebar ( {onClick} ) {

    return (
        <Fragment>
            <div className="sidebar-container">
                <div className="navbar-title">
                    <h2>Menu</h2>
                    <i className="bi bi-list" id="burguer-icon" onClick={onClick}></i>
                </div>

                <NavMenu 
                    containerClass="side-navbar"
                    linkClass="side-link"/>
            </div>
        </Fragment>  
    )
};

export default Sidebar;