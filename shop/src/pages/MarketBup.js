import { Fragment } from 'react';
import './styles/Market.css';
import MarketItem from '../components/MarketItem';
import React, { useState, useEffect } from 'react';
import Fridge from './Fridge';

function Market (props) {

    const market = [
        {id: 1, product: 'Milk', price: 1.75}
    ]

    const [cart, setCart] = useState([]);
    const [totalProducts, setTotal] = useState({});
    const [fridge, setFridge] = useState([]);
    const [filteredData, setFilteredData] = useState([{idIngredient: '1', strIngredient: 'Milk', price: 0}])

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
                price: totalPrice.reduce((acc, currentValue) => acc + currentValue).toFixed(2)
            }) 
        };
        
    }

    function addToCart (e) {
        let product = e.nativeEvent.path[1].childNodes[0].innerText;
        let price = parseFloat(e.nativeEvent.path[1].childNodes[1].innerText);
        let qty = parseInt(e.nativeEvent.path[1].childNodes[2].innerText);  
        let id = e.nativeEvent.path[1].dataset.id;

        if (e.target.dataset.action === 'add-item') {

            let productExist = cart.some(item => item.product === product);  
            let qtyModified = cart.some(item => item.qty !== qty);  
    
            if (!productExist && qty > 0) {
                setCart([    
                    ...cart,
                    {product: product,
                    price: price,
                    qty: qty,
                    totalSum: price * qty,
                    id: id}                    
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

    function handleAddClick (e) {
        setFridge(cart);
        setTotal({})
    }

    // API CALL 
    // COCKTAIL DB https://www.thecocktaildb.com/api.php
    // MEAL DB https://www.themealdb.com/api.php?ref=apilist.fun
    let allProducts = [];

    const getData = async (url) => {
        try {
            const req = await fetch(url);
            const res = await req.json();
            allProducts = res.meals;
        } catch (error) {
            console.error(error)
        }
    }

    getData('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let randomPrice = Math.floor(Math.random() * (10 * 100 - 100) + 100) / 100;

    function handleSearchClick (e) {
        const searchTab = document.getElementById('market-search-tab');
        let search = searchTab.value.toLowerCase();
        setFilteredData(allProducts.filter(item => item.strIngredient.toLowerCase().includes(search)));
        searchTab.placeholder = `You have ${filteredData.length} products to choice`
        searchTab.value = '';
        
    }

    function handleDeleteClick (e) {

        let selectedId = e.nativeEvent.path[2].dataset.id;

        if(e.target.dataset.action === 'delete') {
            setFridge(
                fridge.filter(item => item.id !== selectedId)
                )
        }
        if(e.target.dataset.action === 'edit') {
            setFilteredData(
                filteredData.filter(item => item.idIngredient == selectedId)
                )
        }

    }

    useEffect(() => {
        // console.log(cart)  
    }, [filteredData])

    return (
        <Fragment>
            <div className="pages-container">

                <Fridge fridge={fridge} onClick={handleDeleteClick}/>

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
                        <button className="add-button btn btn-success" onClick={handleAddClick}>ADD</button>
                    </div>
        
                </div>
                
                <div className="market-items-container">
                    <div className="market-search">
                        <input type="text" placeholder="Search your product" id="market-search-tab"/>
                        <i className="bi bi-search" onClick={handleSearchClick}></i>
                    </div>
                    { 
                    
                        filteredData.map(item => {
                                return(
                                    <MarketItem 
                                        key={item.idIngredient} 
                                        id={item.idIngredient}
                                        product={item.strIngredient} 
                                        qty={0} 
                                        price={Math.floor(Math.random() * (10 * 100 - 100) + 100) / 100} 
                                        onClick={handleClick}/>
                                )
                            }) 
                    } 

                </div>
            </div>
        </Fragment>
        
    )
};

export default Market;

