import { Fragment } from 'react';
import './styles/MyFridge.css';
import React, { useState, useEffect } from 'react';
import Fridge from './Fridge';
import Market from './Market';
import Tester from '../components/Tester';

function MyFridge (props) {
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
    // 1st. Open version 1 of a DB named myFridge.
    // It doesn’t return a database, it returns a request for a database because IndexedDB is an asynchronous
    let dbReq = indexedDB.open('myFridge', 1);

    // 2nd. myFridge didn’t previously exist, so it’s automatically created and then the onupgradeneeded event fires. 
    // In an onupgradeneeded callback, and only in that callback, we can create a database’s object stores.
    dbReq.onupgradeneeded = function(event) {
        // Set the db variable to our database so we can use it!  
        db = event.target.result;

        // Create an object store named cart. Object stores in databases are where data are stored.
        let cart = db.createObjectStore('cart', {keyPath: 'id'});
    }

    // 3rd. onsuccess fires after onupgradeneeded completes and it also fires if we refresh the page and open the database again. 
    // So there too, we run db = event.target.result to get our database so we can use it.
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        getAndDisplayItems(db);
        // setFridge(allProductsInDB)
    }

    // 4th. Handle errors
    dbReq.onerror = function(event) {
        console.error('error opening database ' + event.target.errorCode);
    }


    // ADD MARKET ITEM TO THE DB
    function addItemToDB(data) {
        // Start a database transaction defining the Object Store and the method 
        let tx = db.transaction(['cart'], 'readwrite');
        // Then we retrieve that object store from the transaction.
        let objectStore = tx.objectStore('cart');
        // Store data in the object store
        for (let index = 0; index < data.length; index++) {
            objectStore.add(data[index]);
        }
        
        // Wait for the database transaction to complete
        tx.oncomplete = function() { getAndDisplayItems(db) }
        tx.onerror = function(event) {
        alert('error storing data ' + event.target.errorCode);
        }
    }

    // READ THE DB
    function getAndDisplayItems(db) {
        let tx = db.transaction(['cart'], 'readonly');
        let store = tx.objectStore('cart');
        // Create a cursor request to get all items in the store, which 
        // we collect in the allProductsInDB array
        let req = store.openCursor();

        req.onsuccess = function(event) {
          // The result of req.onsuccess is an IDBCursor
          let cursor = event.target.result;
          if (cursor != null) {
            // If the cursor isn't null, we got an IndexedDB item.
            // Add it to the note array and have the cursor continue!
            allProductsInDB.push(cursor.value);
            cursor.continue();
          } else {
            // If we have a null cursor, it means we've gotten
            // all the items in the store, so display the notes we got
          };                 
        };
        req.onerror = function(event) {
          alert('error in cursor request ' + event.target.errorCode);
        };
    };

    // UPDATE DATA FROM THE DB
    const updateData = (data) => {
        const transaction = db.transaction(['cart'], 'readwrite');
        const objectStore = transaction.objectStore('cart');
    /*.put() si el dato existe lo actualiza y si no lo añade*/     
        const request = objectStore.put(data)
    
        request.onsuccess = () => {     

    /*Incluimos la funcion readData para que cuando incluyamos
    una tarea nueva, automaticamente se renderize */
        getAndDisplayItems(db)            
        }     
    }

    // DELETE DATA FROM THE DB
    const deleteData = (key) => {
        const transaction = db.transaction(['cart'], 'readwrite')
        const objectStore = transaction.objectStore('cart') 
        const request = objectStore.delete(key)
    
        request.onsuccess = () => {          
    /*Incluimos la funcion readData para que cuando borremos
    la tarea, se vuelvan a renderizar las cart */
        getAndDisplayItems(db)            
        } 
    }

    const [cart, setCart] = useState([]);
    const [totalProducts, setTotal] = useState({});
    const [fridge, setFridge] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    function selectQty (e) {
        if (e.target.id === 'plus-item') {
            e.target.nextSibling.innerText++;
        }
        if (e.target.id === 'less-item' && e.target.previousSibling.innerText > 0) {
            e.target.previousSibling.innerText--;
        }
    }

    function addToCart (e) {
        let product = e.nativeEvent.path[1].childNodes[0].innerText;
        let price = parseFloat(e.nativeEvent.path[1].childNodes[1].innerText);
        let qty = parseInt(e.nativeEvent.path[1].childNodes[2].innerText);  
        let id = e.nativeEvent.path[1].dataset.id;

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

    };

    function addItems () {
        if (cart.length > 0) {
            const totalQty = cart.map(product => product.qty);
            const totalPrice = cart.map(product => product.totalSum);
            setTotal({
                qty: totalQty.reduce((acc, currentValue) => acc + currentValue),
                price: totalPrice.reduce((acc, currentValue) => acc + currentValue).toFixed(2)
            }) 
        };
        
    };

    function search () {
        const searchTab = document.getElementById('market-search-tab');
        let search = searchTab.value.toLowerCase();
        setFilteredData(allProducts.filter(item => item.strIngredient.toLowerCase().includes(search)));
        searchTab.placeholder = `You have ${filteredData.length} products to choice`
        searchTab.value = '';
    }

    function handleMarketClicks (e) {

        const action = e.target.dataset.action;
        // SELECT QTY
        if (action === 'select-qty') {
            selectQty(e)
        }
        // ADD TO CART
        if (action === 'add-item') {
            addToCart(e)
            addItems()

            let product = e.nativeEvent.path[1].childNodes[0].innerText;
            let price = parseFloat(e.nativeEvent.path[1].childNodes[1].innerText);
            let qty = parseInt(e.nativeEvent.path[1].childNodes[2].innerText);  
            let id = e.nativeEvent.path[1].dataset.id;
            
            const data = {product: product,
                price: price,
                qty: qty,
                totalSum: price * qty,
                id: id};
            
            updateData(data)
        }
        // ADD TO FRIDGE
        if (action === 'add-to-fridge') {
            setFridge(allProductsInDB);
            setTotal({})
            // setFilteredData([])
            // setCart([])
        }
        // PRODUCTS SEARCH
        if (action === 'search') {
            search()
        }
    }

    function handleFridgeClicks (e) {
        const action = e.target.dataset.action;
        let selectedId = e.nativeEvent.path[2].dataset.id;

        // DELETE FRIDGE ITEM
        if(action === 'delete') {
            setFridge(
                fridge.filter(item => item.id !== selectedId)
                );
            setCart(
                cart.filter(item => item.id !== selectedId)
                );
            deleteData(selectedId)
        };

        // EDIT FRIDGE ITEM
        if(action === 'edit') {
            setFilteredData(
                filteredData.filter(item => item.idIngredient == selectedId)
                )
        };        

        // OPEN FRIDGE DOOR
        if(action === 'open-fridge') {
            const fridgeDoor = document.querySelector('.fridge-door');
            const linkIcon = document.querySelector('.fridge-link > i');
            const linkDesc = document.querySelector('.fridge-link > p');
            const doorStatus = linkIcon.classList[1];

            if(doorStatus === "bi-door-open") {
                fridgeDoor.style.transform = 'translateX(-110%)';
                linkIcon.classList.remove("bi-door-open");
                linkIcon.classList.add("bi-door-closed");
                linkDesc.innerText = "Close";         
            }
            if(doorStatus === "bi-door-closed") {
                fridgeDoor.style.transform = 'translateX(0%)';
                linkIcon.classList.remove("bi-door-closed");
                linkIcon.classList.add("bi-door-open");
                linkDesc.innerText = "Open";
            }

            setFridge(allProductsInDB)
        };     

    };

    useEffect (() => {

        console.log({cart: cart, fridge: fridge})
    })

    return (
        <Fragment>
            <Fridge fridge={fridge} onClick={handleFridgeClicks}/>

            <Market
               totalProductsQty={totalProducts.qty} 
               totalProductsPrice={totalProducts.price} 
               filteredData={filteredData}
               onClick={handleMarketClicks}
            />
        </Fragment>
        
    )
};

export default MyFridge;