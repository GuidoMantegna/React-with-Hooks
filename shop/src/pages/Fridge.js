import { Fragment } from 'react';
import './styles/Fridge.css';
import FridgeItem from '../components/FridgeItem'

function Fridge ( {fridge, onClick} ) {

    if(fridge.length === 0) {
        return (
            <Fragment>
                <div className="pages-container">
                    <h2>Fridge</h2>
                    <h1>Your fridge is empty</h1>
                </div>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
            <div className="pages-container">
                <h2>Fridge</h2>
                <ul className="fridge-list">
                    {fridge.map(item => {
                        return (
                        <FridgeItem 
                            key={item.id} 
                            id={item.id} 
                            item={item.product}
                            qty={item.qty}
                            onClick={onClick}/>)
                        })
                    }
                </ul>
            </div>
            </Fragment>
        )
    }

};

export default Fridge;