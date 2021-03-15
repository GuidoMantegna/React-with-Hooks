import React, {Fragment} from 'react';

import './styles/Layout.css';
import Header from './Header';
import Sidebar from './Sidebar';
import NavMenu from './NavMenu';

function Layout ( {children} ) {
    
    let hidden = true; 

    function handleClick () {
        const burguerMenu = document.querySelector('.burguer-menu');
        const burguerIcon = document.getElementById('burguer-icon');

        if (hidden) {
            burguerMenu.style.transform = 'translateY(0)'
            burguerIcon.classList.replace('bi-list', 'bi-x-circle');            
        } else {
            burguerMenu.style.transform = 'translateY(-100%)'
            burguerIcon.classList.replace('bi-x-circle', 'bi-list');    
        }

        hidden = !hidden
    }

    return (
        <Fragment>
            <div className="background">
                <div className="main-container">
                    <div className="header">
                        <Header/>
                    </div>
                    <div className="content">
                        <div className="sidebar">
                            <Sidebar onClick={handleClick}/>
                        </div> 
                        <div className="pages">
                            <NavMenu 
                                onClick={handleClick} 
                                containerClass={'burguer-menu'}
                                linkClass={'burguer-link'}
                            />
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Layout