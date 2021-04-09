import { Fragment } from 'react';
import React, { useState, useEffect } from 'react';
import './styles/Fridge.css';
import { Link } from 'react-router-dom';
import FridgeContain from '../components/FridgeContain';

function Fridge () {

    let allProductsInDB = [];   
    const [fridge, setFridge] = useState([]);
    let db;
    
    let dbReq = indexedDB.open('myFridge', 1);

    // CREATE THE OBJECT STORE
    dbReq.onupgradeneeded = function(event) {
        db = event.target.result;
        let cart = db.createObjectStore('cart', {keyPath: 'idIngredient'});
    };

    // RELOAD THE DB
    dbReq.onsuccess = function(event) {
        db = event.target.result;
        getAndDisplayItems(db);
    };
    dbReq.onerror = function(event) {
        console.error('error opening database ' + event.target.errorCode);
    };

    // READ THE DB
    const getAndDisplayItems = (db) => {
        let tx = db.transaction(['cart'], 'readonly');
        let store = tx.objectStore('cart');
        let req = store.openCursor();

        req.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor != null) {
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
            getAndDisplayItems(db);           
        };     
    };

    // DELETE DATA FROM THE DB
    const deleteData = (key) => {
        const transaction = db.transaction(['cart'], 'readwrite');
        const objectStore = transaction.objectStore('cart');
        const request = objectStore.delete(key);
    
        request.onsuccess = () => {          
            getAndDisplayItems(db)            
        }; 
    };

    function selectQty (e) {
        if (e.target.id === 'plus-item') {
            e.target.nextSibling.innerText++;
        }
        if (e.target.id === 'less-item' && e.target.previousSibling.innerText > 0) {
            e.target.previousSibling.innerText--;
        }
    }

    // ALL FRIDGE CLICKS HANDLERS
    function handleFridgeClicks (e) {
        const action = e.target.dataset.action;
        let selectedId = parseInt(e.nativeEvent.path[2].dataset.id);
        let editPanel = document.querySelectorAll('.edit-panel');

        // DELETE FRIDGE ITEM
        if(action === 'delete') {
            setFridge(
                fridge.filter(item => item.idIngredient !== selectedId)
                );

            deleteData(selectedId)

        };

        // EDIT FRIDGE ITEM
        let startQty;

        if(action === 'edit') {

            editPanel.forEach(panel => {
                if(panel.dataset.id == selectedId) {
                    panel.style.transform = "translateX(0)"
                }
            });

        }; 
        
        // SELECT QTY
        if (action === 'select-qty') {
            selectQty(e)

            let currentQty = parseInt(e.nativeEvent.path[1].childNodes[1].innerText);
            let startQty = parseInt(e.nativeEvent.path[3].childNodes[1].childNodes[0].lastChild.innerText);
            
            editPanel.forEach(() => {
                const addNewQtyBtn = e.nativeEvent.path[2].childNodes[2];
                const closePanelBtn = e.nativeEvent.path[2].childNodes[3];

                if(currentQty !== startQty) {
                    addNewQtyBtn.style.display = 'block';
                    closePanelBtn.style.display = 'none';
    
                } else {
                    addNewQtyBtn.style.display = 'none';
                    closePanelBtn.style.display = 'block';
                }

            });
        }

        // OPEN FRIDGE DOOR
        if(action === 'open-fridge') {
            const fridgeDoor = document.querySelector('.fridge-door');
            const linkIcon = document.querySelector('.fridge-link > i');
            const linkDesc = document.querySelector('.fridge-link > p');
            const doorStatus = linkIcon.classList[1];

            if(doorStatus === "bi-door-open") {
                fridgeDoor.style.transform = 'translateX(-150%)';
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
        
        // ADD NEW QTY TO DB
        if(action === 'add-new-qty') {
            allProductsInDB = []

            let product = e.nativeEvent.path[1].childNodes[0].innerText;
            let qty = parseInt(e.nativeEvent.path[1].childNodes[1].childNodes[1].innerText);  
            let id = parseInt(e.nativeEvent.path[2].dataset.id);

            const data = {strIngredient: product, qty: qty, idIngredient: id};
            
            if(data.qty > 0) {
                updateData(data)
            };

            editPanel.forEach(() => {
                const addNewQtyBtn = e.nativeEvent.path[1].childNodes[2];
                const closePanelBtn = e.nativeEvent.path[1].childNodes[3];

                addNewQtyBtn.style.display = 'none';
                closePanelBtn.style.display = 'block';
            });


        }

        // CLOSE PANEL AND SET FRIDGE
        if(action === 'close-edit-panel') {

            setFridge(allProductsInDB);

            editPanel.forEach(panel => {
                if(panel.dataset.id == selectedId) {
                    panel.style.transform = "translateX(120%)"
                };
            });

        }
        
    };

    useEffect(() => {

    })

    // let postMessage;

    // if(fridge.length == 0) {
    //     postMessage = "- Your fridge is empty, go to the market!"
    // } else {
    //     postMessage = `- You have ${allProductsInDB.length} products in your fridge!`
    // }

        return (
            <Fragment>
                    {/* <div className="page-header"> */}
                    <div className="page-title-container">
                        <h2 className="page-title"><i className="bi bi-door-closed ico-link"></i>- Fridge</h2>
                    </div>

                <div className="fridge-header-container">
                    <div className="small-title-container">
                        <h2 className="small-title"><i className="bi bi-door-closed ico-link"></i>- Fridge</h2>
                    </div>
                    <div className="fridge-menu">
                        <div className="fridge-link" onClick={handleFridgeClicks}>
                            <i className="bi bi-door-open" data-action='open-fridge'></i>
                            <p id="fridge-link-desc" data-action='open-fridge'>Open</p>
                        </div>
                        <Link to="/market" className="fridge-link link">
                            <i className="bi bi-shop"></i>
                            <p id="fridge-link-desc">Market</p> 
                        </Link>
                    </div>
                </div>
                    
                    {/* </div> */}
                    
                    <div className="fridge-content">
                        <div className="fridge-door">
                            <div className="fridge-temperature">
                                <p>4°C<i className="bi bi-thermometer-low"></i></p>
                            </div>
                            <div className="fridge-post">
                                <p>- Open and choice what to eat!</p>
                            </div>
                        </div>
                        <FridgeContain fridge={fridge} onClick={handleFridgeClicks}/>
                    </div>
            </Fragment>
        )
};

export default Fridge;