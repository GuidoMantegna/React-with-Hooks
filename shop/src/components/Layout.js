import React, {Fragment} from 'react';
import { useState, useEffect } from 'react';
import './styles/Layout.css';
import Header from './Header';
import NavMenu from './NavMenu';
import { Link } from 'react-router-dom';

function Layout ( {children} ) {
    const [navbarTitle, setTitle] = useState({ title: '- Home', className: 'bi bi-house-fill ico-link' })
    const [userName, setUserName] = useState('Hi User!');
    const [status, setStatus] = useState('out');
    let hidden = true; 

    const setLinkStyle = (e, selectedNum) => {
        const links = Array.from(document.querySelectorAll('.side-link'));
        e.target.style.fontWeight = '100';

        links.forEach(link => link !== e.target ? link.style.fontWeight = 'bold' : link.style.fontWeight = '100')

        // for (let index = 1; index < 6; index++) {
        //     if(index !== selectedNum) {
        //         e.nativeEvent.path[2].childNodes[index].childNodes[0].style.fontWeight = 'bold'
        //     }
            
        // }
    }

    const setSidenavTitle = (e) => {     
        const linkTo = e.target.dataset.link;
        

        switch (linkTo) {
            case "home":
                // setTitle({ title: '- Home', className: 'bi bi-house-fill ico-link' });
                setLinkStyle(e, 1);                
                break;
            case "fridge":
                // setTitle({ title: '- Fridge', className: 'bi bi-door-closed ico-link' });
                setLinkStyle(e, 2);
                break;
            case "market":
                // setTitle({ title: '- Market', className: 'bi bi-shop ico-link' });
                setLinkStyle(e, 3);
                break;
            case "tips":
                // setTitle({ title: '- Tips', className: 'bi bi-journal-bookmark ico-link' });
                setLinkStyle(e, 4);
                break;
            case "contact":
                // setTitle({ title: '- Contact', className: 'bi bi-envelope ico-link' });
                setLinkStyle(e, 5);
                break;
        };
    };

    const showHideBurguerMenu = () => {
        const burguerMenu = document.querySelector('.burguer-menu');
        const burguerIcon = document.getElementById('burguer-icon');

        if (hidden) {
            burguerMenu.style.transform = 'translateY(60px)'
            burguerIcon.classList.replace('bi-list', 'bi-x-circle');            
        } else {
            burguerMenu.style.transform = 'translateY(-100%)'
            burguerIcon.classList.replace('bi-x-circle', 'bi-list');    
        }

        hidden = !hidden
    };

    function handleSideClicks (e) {   
        // setSidenavTitle(e) 
        const sideLinks = Array.from(document.querySelectorAll('.side-link'));
        
        sideLinks.forEach(link => {
            link !== e.target ? link.style.color = 'rgb(150, 150, 150)' : link.style.color = 'rgb(80, 80, 80)'
        })
        
    };  
    
    function handleBurguerClicks (e) {
        // setSidenavTitle(e)
        showHideBurguerMenu()
        const burguerLinks = Array.from(document.querySelectorAll('.burguer-link'));
        

        if(e.target.id ==! "burguer-icon") {
            burguerLinks.forEach(link => {
                link !== e.target ? link.style.color = 'rgb(255, 255, 255)' : link.style.color = 'rgb(80, 80, 80)'
            })
        }

    }

    const handleLogClick = e => {
        const input = document.querySelector('.login-input');
        
        // let logStatus = e.target.dataset.status;
        

        switch (status) {
            case "out":
                // input.style.transform = "translateX(0)";
                input.style.height = "30px";
                e.target.classList.remove('btn-success');
                e.target.classList.add('btn-warning');
                setStatus("almost");
                break;
            case "almost":
                if(input.value !== "") {
                    setUserName("Hi! " + input.value);
                    input.value = ""                    
                    e.target.classList.remove('btn-warning');
                    e.target.classList.add('btn-danger');
                    e.target.innerText = 'logout';
                    // input.style.transform = "translateX(-150%)";
                    input.style.height = "0";
                    input.style.background = "rgb(220, 220, 220)"
                    setStatus("in");
                } else {
                    input.style.background = "rgba(212, 85, 85, .5)"
                }
                break;
            case "in":
                e.target.classList.remove('btn-danger');
                e.target.classList.add('btn-success');
                e.target.innerText = 'login';
                setUserName('Hi User!');
                setStatus("out");
                break;
        
            default:
                break;
        }
    }

    useEffect(() => {

    })

    return (
        <Fragment>
            <div className="background">
                <div className="main-container">
                    <div className="header">
                        <Header/>
                    </div>
                    <div className="content">
                        <NavMenu 
                            containerClass={'side-navbar'}
                            linkClass={'side-link'}
                            title={navbarTitle.title}
                            titleClassName={navbarTitle.className}
                            onClick={handleSideClicks}
                        >
                            <div className="login-container">
                                <p className="user-name"><i className="bi bi-person-circle"></i>{userName}</p>
                                <button className="btn-success btn login-btn" onClick={handleLogClick} data-status="out">Login</button>
                                <input className="login-input" type="text" placeholder="user name"/>
                            </div>
                        </NavMenu>
                        <div className="pages">
                            <i className="bi bi-list" id="burguer-icon" onClick={handleBurguerClicks}></i>
                            {/* <div className="page-title-container">
                                <h2 className="page-title"><i className={navbarTitle.className}></i>{navbarTitle.title}</h2>
                                <i className="bi bi-list" id="burguer-icon" onClick={handleBurguerClicks}></i>
                            </div> */}
                            
                            <NavMenu 
                                containerClass={'burguer-menu'}
                                linkClass={'burguer-link'}
                                onClick={handleBurguerClicks}
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