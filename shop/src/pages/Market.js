import { Fragment } from 'react';
import './styles/Market.css';
import MarketItem from '../components/MarketItem';
import React, { useState, useEffect } from 'react';

function Market (props) {

    const [cart, setCart] = useState([]);
    const [totalProducts, setTotal] = useState({});

    function selectQty (e) {
        if (e.target.id === 'plus-item') {
            e.target.nextSibling.innerText++;
        }
        if (e.target.id === 'less-item' && e.target.previousSibling.innerText > 0) {
            e.target.previousSibling.innerText--;
        }
    }

    function addItems () {
        if (cart.length > 0) {
            const totalQty = cart.map(product => product.qty);
            const totalPrice = cart.map(product => product.totalSum);
            setTotal({
                qty: totalQty.reduce((acc, currentValue) => acc + currentValue),
                price: totalPrice.reduce((acc, currentValue) => acc + currentValue)
            }) 
        };
        
    }

    function addToCart (e) {
        let product = e.nativeEvent.path[1].childNodes[0].innerText;
        let price = parseFloat(e.nativeEvent.path[1].childNodes[1].innerText);
        let qty = parseInt(e.nativeEvent.path[1].childNodes[2].innerText);  

        if (e.target.dataset.action === 'add-item') {

            let productExist = cart.some(item => item.product === product);  
            let qtyModified = cart.some(item => item.qty !== qty);  
    
            if (!productExist && qty > 0) {
                setCart([    
                    ...cart,
                    {product: product,
                    price: price,
                    qty: qty,
                    totalSum: price * qty},
                    ]);    
            };
    
            if (productExist && qtyModified) {
                
                let productIndex = cart.findIndex(item => item.product === product);
                cart[productIndex].qty = qty;
                cart[productIndex].totalSum = cart[productIndex].price * qty;
            };
            
            addItems()
            
        }

    };

    function handleClick (e) {  
        selectQty(e)
        addToCart(e)
        
    } 

    useEffect(() => {
        console.log(cart)            
    })

    return (
        <Fragment>
            <div className="pages-container">
                <div className="market-menu">
                    <h2>The Market</h2>
                    
                    <div className="market-info">
                        <div className="total-qty-container">
                            <i className="bi bi-cart4"></i>
                            <span className="total-qty">{totalProducts.qty}</span>
                        </div>
                        <div className="total-price-container">
                            <i className="bi bi-cash"></i>
                            <span className="total-price">{totalProducts.price}</span>
                        </div>
                        <button className="add-button btn btn-success">ADD</button>
                    </div>
                    
                    
                </div>
                
                <div className="market-items-container">
                    <input type="text" placeholder="Search your product" className="market-search"/>
                    <MarketItem
                        product="Beer"
                        price="1.90"
                        qty="0"
                        onClick={handleClick}/>
                    <MarketItem
                        product="Milk"
                        price="1.25"
                        qty="0"
                        onClick={handleClick}/>
                    <MarketItem
                        product="Bread"
                        price="0.75"
                        qty="0"
                        onClick={handleClick}/>
                </div>
            </div>
        </Fragment>
        
    )
};

export default Market;

