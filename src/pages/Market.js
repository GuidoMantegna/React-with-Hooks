import { Fragment } from 'react';
import React, { useState, useEffect } from 'react';
import './styles/Market.css';
import MarketItem from '../components/MarketItem';
import MarketHeader from '../components/MarketHeader';


function Market ({ history }) {

    let allProducts = [];

    const getApiData = async (url) => {
        try {
            const req = await fetch(url);
            const res = await req.json();
            allProducts = res.meals;
            allProducts.map(item => item.price = Math.floor(Math.random() * (10 * 100 - 100) + 100) / 100);
        } catch (error) {
            console.error(error)
        }
    }

    getApiData('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    let allProductsInDB = [];    

    let db;
    
    // OPEN DB
    let dbReq = indexedDB.open('myFridge', 1);

    // CREATE THE OBJECT STORE
    dbReq.onupgradeneeded = function(event) {
        // Set the db variable to our database. 
        db = event.target.result;
        // Create an object store named cart.
        let cart = db.createObjectStore('cart', {keyPath: 'idIngredient'});
    };

    // OPEN THE DB WHICH IS ALREADY CREATED.
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        getAndDisplayItems(db);
    };
    dbReq.onerror = function(event) {
        console.error('error opening database ' + event.target.errorCode);
    };

    // READ THE DB
    const getAndDisplayItems = (db) => {
        let transaction = db.transaction(['cart'], 'readonly');
        let objectStore = transaction.objectStore('cart');
        let request = objectStore.openCursor();

        request.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor != null) {
            allProductsInDB.push(cursor.value);
            cursor.continue();
          };                 
        };
        request.onerror = (error) => {
            console.error(error)
        };
    };

    // UPDATE DATA FROM THE DB
    const updateData = (data) => {
        const transaction = db.transaction(['cart'], 'readwrite');
        const objectStore = transaction.objectStore('cart');
        const request = objectStore.put(data);
    
        request.onsuccess = () => {     
            getAndDisplayItems(db)            
        };
        request.onerror = (error) => {
            console.error(error)
        };     
    };

    const [cart, setCart] = useState([]);
    const [totalProducts, setTotal] = useState({totalPrice: 0, totalQty: 0});
    const [filteredData, setFilteredData] = useState([]);

    const selectQty = e => {
        if (e.target.id === 'plus-item') {
            e.target.previousSibling.innerText++;
        }
        if (e.target.id === 'less-item' && e.target.nextSibling.innerText > 0) {
            e.target.nextSibling.innerText--;
        }
    };

    const addToCart = ({strIngredient, price, qty, idIngredient}) => {
        let productIndex = cart.findIndex(item => item.product === strIngredient);
        let productExist = cart.some(item => item.product === strIngredient);  
        let qtyModified = cart.some(item => item.qty !== qty);          
    
        if (!productExist && qty > 0) {
            setCart([    
                ...cart,
                {product: strIngredient,
                price: price,
                qty: qty,
                totalSum: price * qty,
                id: idIngredient}                    
                ]);
            setTotal({
                totalQty: totalProducts.totalQty + qty,
                totalPrice: totalProducts.totalPrice + qty*price,  
                });                                 
        };

        if (productExist && qtyModified) {
            let previousQty = cart[productIndex].qty;
            let difference = qty - previousQty;
            cart[productIndex].qty = qty;
            cart[productIndex].totalSum = cart[productIndex].price * qty;

            setTotal({
                totalQty: totalProducts.totalQty + difference,
                totalPrice: totalProducts.totalPrice + difference*price,  
                });
        };
    };
    
    const search = () => {
        const searchTab = document.getElementById('market-search-tab');
        let search = searchTab.value.toLowerCase();  
        
        if(search === '') {
            searchTab.placeholder = "Type what you want to search";
        } else {
            setFilteredData(allProducts.filter(item => item.strIngredient.toLowerCase().includes(search)));
            searchTab.placeholder = "Search for your products";
            searchTab.value = '';  
        }
    }; 

    // ALL MARKET CLICKS HANDLERS
    const handleMarketClicks = e => {
        const action = e.target.dataset.action;

        // SELECT QTY
        if (action === 'select-qty') {
            selectQty(e)
        };

        // ADD TO CART AND TO DB
        if (action === 'add-item') {
            const product = e.target.offsetParent.firstChild.childNodes[0].textContent,
            price = parseFloat(e.target.offsetParent.firstChild.lastElementChild.childNodes[1].data),
            qty = parseInt(e.target.offsetParent.childNodes[1].childNodes[1].innerText),  
            id = parseInt(e.target.offsetParent.dataset.id),
            data = {
                strIngredient: product,
                price: price,
                qty: qty,
                idIngredient: id };
                
            addToCart(data);

            if(data.qty > 0) {
                updateData(data)
            };
        };

        // ADD TO FRIDGE
        if (action === 'add-to-fridge') {

            if(totalProducts.totalQty > 0) {
                setTotal({totalPrice: 0, totalQty: 0})
                setCart([])
                setFilteredData([]) 
                history.push('/fridge'); 
            }                     
        };

        // PRODUCTS SEARCH
        if (action === 'search') {
            search()
        };
    };

    useEffect(() => {
        const addButton = document.querySelector('.add-button');
        if (totalProducts.totalQty > 0) {
            addButton.classList.remove('btn-danger')
            addButton.classList.add('btn-success')
        } else {
            addButton.classList.remove('btn-success')
            addButton.classList.add('btn-danger')
        }
    });    

    if (filteredData.length === 0) {
        return (
            <Fragment>
                <div className="page-title-container">
                    <h2 className="page-title"><i className="bi bi-shop ico-link"></i>- Market</h2>
                </div>

                <MarketHeader
                    totalProductsPrice={""}
                    totalProductsQty={""}
                    filteredData={filteredData}
                    onClick={handleMarketClicks}
                />
            
                <div className="empty-market-back"></div>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <div className="page-title-container">
                    <h2 className="page-title"><i className="bi bi-shop ico-link"></i>- Market</h2>
                </div>

                <MarketHeader
                    totalProductsPrice={totalProducts.totalPrice.toFixed(2)}
                    totalProductsQty={totalProducts.totalQty}
                    filteredData={filteredData}
                    onClick={handleMarketClicks}
                />

                <div className="search-results">
                    {filteredData.map(item => {
                            return(
                                <MarketItem 
                                    key={item.idIngredient} 
                                    id={item.idIngredient}
                                    product={item.strIngredient} 
                                    qty={item.qty || 0} 
                                    price={item.price} 
                                    onClick={handleMarketClicks}/>
                            )
                        })} 
                </div>                
            </Fragment>  
        )
    };

};

export default Market;

