import { Fragment } from 'react';
import './styles/MarketItem.css';

function MarketItem ( { product, price, qty, onClick, id } ) {

    return (
        <Fragment>
            <div className="market-item" onClick={onClick} data-id={id}>
                <p className="market-product">{product}</p>
                <span>{price}</span>
                <p>
                    <i className="bi bi-plus-circle plus-item" id="plus-item" data-action="select-qty"></i>
                    <span className="qty" id="item-qty">{qty}</span>
                    <i className="bi bi-dash-circle less-item" id="less-item" data-action="select-qty"></i>
                </p>
                <i className="bi bi-cart-plus add-item" data-action="add-item"></i>
            </div>
        </Fragment>
    )
};

export default MarketItem;