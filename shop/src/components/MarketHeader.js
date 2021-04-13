import { Fragment } from 'react';

function MarketHeader ({ totalProductsPrice, totalProductsQty, onClick, filteredData }) {

    let marketSearchInfo;

    if(filteredData.length === 0) {
        marketSearchInfo = 'Look into over 500 items and fill your fridge ↑'
    } else {
        marketSearchInfo = `You have ${filteredData.length} products to choice ↓`
    }

    return (
        <Fragment>

            <div className="market-header-container">
                <div className="small-title-container">
                    <h2 className="small-title"><i className="bi bi-shop ico-link"></i>- Market</h2>
                </div>

                <div className="market-menu-container" id="market">
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
            
            
            <div className="market-search-container">

                <div className="market-search">
                    <input type="text" placeholder="Search for your products" id="market-search-tab"/>
                    <i className="bi bi-search" data-action="search" onClick={onClick}></i>
                </div>
                <div className="market-search-info">
                    <p>{marketSearchInfo}</p>
                </div>
                
            </div>
        </Fragment>
    )
}

export default MarketHeader;