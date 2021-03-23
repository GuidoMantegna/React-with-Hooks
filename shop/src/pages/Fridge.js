import { Fragment } from 'react';
import './styles/Fridge.css';

import FridgeContain from '../components/FridgeContain';

function Fridge ( {fridge, onClick} ) {

    let postMessage;

    if(fridge.length == 0) {
        postMessage = "- Your fridge is empty, go to the market!"
    } else {
        postMessage = `- You have ${fridge.length} products in your fridge!`
    }

        return (
            <Fragment>
                <div className="fridge-main-container">
                    <h2>Fridge</h2>
                    <div className="fridge-menu">
                        <div className="fridge-link" onClick={onClick}>
                            <i className="bi bi-door-open" data-action='open-fridge'></i>
                            <p id="fridge-link-desc" data-action='open-fridge'>Open</p>
                        </div>
                        <div className="fridge-link">
                                <i className="bi bi-shop"></i>
                                <p id="fridge-link-desc">Market</p>                            
                        </div>

                    </div>
                    <div className="fridge">
                        <div className="fridge-door">
                            <div className="fridge-temperature">
                                <p>4°C<i className="bi bi-thermometer-low"></i></p>
                            </div>
                            <div className="fridge-post">
                                <p>{postMessage}</p>
                            </div>
                        </div>
                        <FridgeContain fridge={fridge} onClick={onClick} />
                    </div>
                </div>
            </Fragment>
        )
};

export default Fridge;