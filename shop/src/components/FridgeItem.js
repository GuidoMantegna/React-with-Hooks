import { Fragment } from 'react';
import './styles/FridgeItem.css';
import FoodIcon from '../images/food-icon.png';
import Ice from '../images/left-bottom-ice.png'

function FridgeItem ( {item, qty, onClick, id} ) {

    return (
        <Fragment>
            <div className="fridge-item-container" data-id={id}>
                <div className="food-pic-container">
                    <img className="food-pic" src={FoodIcon}></img>
                </div>
                <div className="item-info">
                    <h5>{item} x <span>{qty}</span></h5>
                    {/* <p className="nutrition-info">{nut}</p> */}
                </div>
                <div className="change-item">
                    <i className="bi bi-pencil" onClick={onClick} data-action="edit"></i>
                    <i className="bi bi-trash" onClick={onClick} data-action="delete"></i>
                </div>
                <img className="ice-pic" src={Ice}></img>
            </div>
        </Fragment>
    )
};

export default FridgeItem;