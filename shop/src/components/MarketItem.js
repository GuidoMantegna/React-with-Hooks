import { Fragment } from 'react';
import './styles/MarketItem.css';

function MarketItem ( { product, price, qty, onClick } ) {

    return (
        <Fragment>
            <div className="market-item" onClick={onClick}>
                <p className="market-product">{product}</p>
                <span>{price}</span>
                <p>
                    <i className="bi bi-plus-circle plus-item" id="plus-item"></i>
                    <span className="qty" id="item-qty">{qty}</span>
                    <i className="bi bi-dash-circle less-item" id="less-item"></i>
                </p>
                <i className="bi bi-cart-plus add-item" data-action="add-item"></i>
            </div>
        </Fragment>
    )
};

export default MarketItem;