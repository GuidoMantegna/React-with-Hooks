import { Fragment } from 'react';
import './styles/Market.css';
import MarketItem from '../components/MarketItem';
import MarketHeader from '../components/MarketHeader';


function Market ({ totalProductsQty, totalProductsPrice, filteredData, onClick }) {

    if (filteredData.length === 0) {
        return (
            <Fragment>
                <MarketHeader
                    totalProductsPrice={totalProductsPrice}
                    totalProductsQty={totalProductsQty}
                    onClick={onClick}
                />
                {/* <div className="pages-container">
    
                    <div className="market-menu">
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
                        </div> */}
                        <div className="search-results">
                            <div className="empty-search">
                                <p>Look into over 500 items and fill your fridge</p>
                            </div>
                        </div>
                        
                    {/* </div>
                </div> */}
            </Fragment>
            
        )
    } else {
        return (
            <Fragment>
                <MarketHeader
                    totalProductsPrice={totalProductsPrice}
                    totalProductsQty={totalProductsQty}
                    onClick={onClick}
                />
                {/* <div className="pages-container">
    
                    <div className="market-menu">
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
                        </div> */}
                        <div className="search-results">
                            { 
                            
                                filteredData.map(item => {
                                        return(
                                            <MarketItem 
                                                key={item.idIngredient} 
                                                id={item.idIngredient}
                                                product={item.strIngredient} 
                                                qty={0} 
                                                price={item.price} 
                                                onClick={onClick}/>
                                        )
                                    }) 
                            } 
                        </div>
    
                    {/* </div>
                </div> */}
            </Fragment>
            
        )
    }

};

export default Market;

