import { Fragment } from 'react';
import './styles/MarketItem.css';

function MarketItem ({ product, price, qty, onClick, id }) {

    return (
        <Fragment>
            <div className="market-item" onClick={onClick} data-id={id}>
                <p className="market-product">{product}
                    <span className="price">$ {price}</span>
                </p>
                <p className="item-qty">
                    <i className="bi bi-dash-circle less-item" id="less-item" data-action="select-qty"></i>
                    <span className="qty" id="item-qty">{qty}</span>
                    <i className="bi bi-plus-circle plus-item" id="plus-item" data-action="select-qty"></i>
                </p>
                <a href="#market-title"><i className="bi bi-cart-plus add-item" data-action="add-item"></i></a>
            </div>
        </Fragment>
    )
};

export default MarketItem;