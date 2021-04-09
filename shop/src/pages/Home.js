import { Fragment } from 'react';
import './styles/Home.css';
import HomeCard from '../components/HomeCard';
import FridgeBack from '../images/fridge-background.jpg';
import MarketBack from '../images/market-background.jpg';
import TipsBack from '../images/tips-background.jpg';
import ContactBack from '../images/contact-background.jpg';
import Logo from '../images/avocado.png'

function Home (props) {
    return (
        <Fragment>
            {/* <div className="page-header">

            </div>
            <div className="page-content"> */}
                <div className="page-title-container">
                    <h2 className="page-title"><i className="bi bi-house-fill ico-link"></i>- Home</h2>
                </div>

                <div className="home-header-container">
                    <div className="small-title-container">
                        <h2 className="page-title"><i className="bi bi-envelope ico-link"></i>- Home</h2>
                    </div>
                </div>
                <div className="home-main-container">

                <HomeCard 
                    cardTitle='Look into your fridge'
                    cardText='Check your fridge before the market get closed.'
                    backgroundColor="rgba(210, 105, 30, .85)"
                    cardBack={FridgeBack}
                    linkTo='/fridge'
                    />
                <HomeCard 
                    cardTitle='Visit the market!'
                    cardText='Go to the market and choice what you want to eat.'
                    backgroundColor="rgba(30, 210, 105, 0.75)"
                    cardBack={MarketBack}
                    linkTo="/market"
                />
                <HomeCard 
                    cardTitle='Get best tips'
                    cardText='Learn about more interesting food facts'
                    backgroundColor="rgba(235, 192, 201, 0.75)"
                    cardBack={TipsBack}
                    linkTo="/tips"
                    />
                <HomeCard 
                    cardTitle='Join us!'
                    cardText='Suscribe to our newsletter and be the first to get the info'
                    backgroundColor="rgba(255, 252, 69, 0.85)"
                    cardBack={ContactBack}
                    linkTo="/contact"
                    />

                </div>
            {/* </div> */}
        </Fragment>
        
    )
};

export default Home;