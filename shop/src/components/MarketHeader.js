import { Fragment } from 'react';

function MarketHeader ({ totalProductsPrice, totalProductsQty, onClick }) {
    const addButton = document.querySelector('.add-button');
    
    if (totalProductsQty > 0) {
        addButton.classList.remove('btn-danger')
        addButton.classList.add('btn-success')
    } else {
        addButton.classList.remove('btn-success')
        addButton.classList.add('btn-danger')
    }

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
                                <span className="total-price">${totalProductsPrice}</span>
                            </div>
                            <button className="add-button btn btn-danger" data-action="add-to-fridge" onClick={onClick}>ADD</button>
                        </div>
            
                    </div>
                    
                    <div className="market-items-container">
                        <div className="market-search">
                            <input type="text" placeholder="Search for your products" id="market-search-tab"/>
                            <i className="bi bi-search" data-action="search" onClick={onClick}></i>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

export default MarketHeader;