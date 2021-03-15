import { Fragment } from 'react';
import './styles/FridgeItem.css';
import Food from '../images/milk.jpg'

function FridgeItem ( {item, qty, nut} ) {

    return (
        <Fragment>
            <div className="fridge-item-container">
                <img className="food-pic" src={Food}></img>
                <div className="item-info">
                    <h5>{item} x <span>{qty}</span></h5>
                    <p className="nutrition-info">{nut}</p>
                </div>
                <div className="change-item">
                    <i className="bi bi-pencil"></i>
                    <i className="bi bi-trash"></i>
                </div>
            </div>
        </Fragment>
    )
};

export default FridgeItem;