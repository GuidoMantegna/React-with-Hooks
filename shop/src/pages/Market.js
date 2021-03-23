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
                <div className="search-results">
                    <div className="empty-search">
                        <p>Look into over 500 items and fill your fridge ↑</p>
                    </div>
                </div>
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
                <div className="search-results">
                    <div className="empty-search">
                        <p>You have {filteredData.length} products to choice ↓</p>
                    </div>
                </div>
                <div className="search-results">
                    {filteredData.map(item => {
                                return(
                                    <MarketItem 
                                        key={item.idIngredient} 
                                        id={item.idIngredient}
                                        product={item.strIngredient} 
                                        qty={item.qty || 0} 
                                        price={item.price} 
                                        onClick={onClick}/>
                                )
                            })} 
                </div>
            </Fragment>
            
        )
    }

};

export default Market;

