import { Fragment } from 'react';
import FridgeItem from '../components/FridgeItem';

function FridgeContain ( {fridge, onClick} ) {
    if(fridge.length === 0) {
        return (
            <Fragment>
                <h1>Your fridge is empty</h1>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
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
            </Fragment>
        )
    }
};

export default FridgeContain;