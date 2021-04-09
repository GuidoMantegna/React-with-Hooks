import { Fragment } from 'react';
import React, { useState, useEffect } from 'react';
import './styles/Market.css';
import MarketItem from '../components/MarketItem';
import MarketHeader from '../components/MarketHeader';


function Market () {

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

    // ADD MARKET ITEM TO THE DB
    function addItemToDB(data) {
        let transaction = db.transaction(['cart'], 'readwrite');
        let objectStore = transaction.objectStore('cart');

        for (let index = 0; index < data.length; index++) {
            objectStore.add(data[index]);
        };
        
        transaction.oncomplete = function() { getAndDisplayItems(db) }
        transaction.onerror = function(event) {
            alert('error storing data ' + event.target.errorCode);
        }
    }

    // READ THE DB
    function getAndDisplayItems(db) {
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
    }

    // DELETE DATA FROM THE DB
    const deleteData = (key) => {
        const transaction = db.transaction(['cart'], 'readwrite')
        const objectStore = transaction.objectStore('cart') 
        const request = objectStore.delete(key)
    
        request.onsuccess = () => {          
            getAndDisplayItems(db)            
        }; 
    }

    const [cart, setCart] = useState([]);
    const [totalProducts, setTotal] = useState({totalPrice: 0, totalQty: 0});
    const [filteredData, setFilteredData] = useState([]);

    function selectQty (e) {
        if (e.target.id === 'plus-item') {
            e.target.nextSibling.innerText++;
        }
        if (e.target.id === 'less-item' && e.target.previousSibling.innerText > 0) {
            e.target.previousSibling.innerText--;
        }
    }

    function addToCart (product, price, qty, id) {
        let productIndex = cart.findIndex(item => item.product === product);
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
    
    function search () {
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
    function handleMarketClicks (e) {
        const action = e.target.dataset.action;

        // SELECT QTY
        if (action === 'select-qty') {
            selectQty(e)
        }
        // ADD TO CART AND TO DB
        if (action === 'add-item') {
            const product = e.nativeEvent.path[2].childNodes[0].firstChild.data;
            const price = parseFloat(e.nativeEvent.path[2].childNodes[0].firstElementChild.childNodes[1].data);
            const qty = parseInt(e.nativeEvent.path[2].childNodes[1].childNodes[1].innerText);  
            const id = parseInt(e.nativeEvent.path[2].dataset.id);

            addToCart(product, price, qty, id);

            const data = {strIngredient: product,
                price: price,
                qty: qty,
                totalSum: price * qty,
                idIngredient: id};
            
            if(data.qty > 0) {
                updateData(data)
            };

        };

        // ADD TO FRIDGE
        if (action === 'add-to-fridge') {
            setTotal({totalPrice: 0, totalQty: 0})
            setCart([])
            setFilteredData([])            
        };

        // PRODUCTS SEARCH
        if (action === 'search') {
            search()
        };
    }

    useEffect(() => {
        const addButton = document.querySelector('.add-button');
        if (totalProducts.totalQty > 0) {
            addButton.classList.remove('btn-danger')
            addButton.classList.add('btn-success')
        } else {
            addButton.classList.remove('btn-success')
            addButton.classList.add('btn-danger')
        }
    })

    
    

    if (filteredData.length === 0) {
        return (
            <Fragment>
                {/* <div className="page-header"> */}
                <div className="page-title-container">
                    <h2 className="page-title"><i className="bi bi-shop ico-link"></i>- Market</h2>
                </div>
                    <MarketHeader
                        totalProductsPrice={""}
                        totalProductsQty={""}
                        filteredData={filteredData}
                        onClick={handleMarketClicks}
                    />
                {/* </div> */}
                
                {/* <div className="page-content"> */}
                    <div className="empty-market-back">

                    </div>
                {/* </div> */}
                
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                {/* <div className="page-header"> */}
                <div className="page-title-container">
                    <h2 className="page-title"><i className="bi bi-shop ico-link"></i>- Market</h2>
                </div>
                    <MarketHeader
                        totalProductsPrice={totalProducts.totalPrice.toFixed(2)}
                        totalProductsQty={totalProducts.totalQty}
                        filteredData={filteredData}
                        onClick={handleMarketClicks}
                    />
                {/* </div> */}

                {/* <div className="page-content"> */}
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
                {/* </div> */}
                
            </Fragment>
            
        )
    }

};

export default Market;

