import { Fragment } from 'react';

function MarketHeader ({ totalProductsPrice, totalProductsQty, onClick }) {
    return (
    <Fragment>
                <div className="market-container">
    
                    <div className="market-menu-container">
                        <h2>The Market</h2>
                        
                        <div className="market-info">
                            <div className="total-qty-container">
                                <i className="bi bi-cart4"></i>
                                <span className="total-qty">{totalProductsQty}</span>
                            </div>
                            <div className="total-price-container">
                                <i className="bi bi-cash"></i>
                                <span className="total-price">{totalProductsPrice}</span>
                            </div>
                            <button className="add-button btn btn-success" data-action="add-to-fridge" onClick={onClick}>ADD</button>
                        </div>
            
                    </div>
                    
                    <div className="market-items-container">
                        <div className="market-search">
                            <input type="text" placeholder="Search your product" id="market-search-tab"/>
                            <i className="bi bi-search" data-action="search" onClick={onClick}></i>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default MarketHeader;