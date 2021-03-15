import { Fragment } from 'react';
import './styles/Fridge.css';
import FridgeItem from '../components/FridgeItem'

function Fridge ( {fridge} ) {

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
                            item={item.product}
                            qty={item.qty}/>)
                        })
                    }
                    {/* <FridgeItem 
                        item="Milk"
                        qty="2"
                        nut="Nutrients: Calories: 122, Fat: 4.8g, Sodium: 115mg, Calcium: 293mg"/>
                    <FridgeItem 
                        item="Beer"
                        qty="5"
                        nut="Nutrients: Calories: 122, Fat: 4.8g, Sodium: 115mg, Calcium: 293mg"/>
                    <FridgeItem 
                        item="Bread"
                        qty="0,500"
                        nut="Nutrients: Calories: 122, Fat: 4.8g, Sodium: 115mg, Calcium: 293mg"/> */}
                </ul>
            </div>
            </Fragment>
        )
    }

};

export default Fridge;