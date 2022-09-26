let cartArray = [];
let totalCost = 0;
let cartProducts = JSON.parse(localStorage.getItem("cart"))
let cartContainer = document.getElementById("cartContainer")


// REMOVE  AND ADD MORE ITEMS

function removeProduct(index){
    cartArray.splice(index, 1);
    cartProducts.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    showCart();
    showTotalCostUsd()
}

// HERE I SHOW EVERY PRODUCT INFO SAVED IN cartArray

function showCart(){
    cartContainer.innerHTML = "";
    for (let i = 0; i < cartArray.length; i++) {
        const product = cartArray[i];
        cartContainer.innerHTML += `
            <div class="list-group-item list-group-item-action">
                <div class="row d-flex mt-3 mb-2 ms-4 mb-4">
                    <div class="col-lg-2 text-center" onclick="loadProductInfo(${product.id})" style="cursor: pointer;">
    	                <h5 class="ms-4 mb-2"> ` + product.name + ` </h5>
                        <img style="width: 200px"src="`+ product.images[0] +`">
                    </div>
                    <div class="col-lg-4 me-5 ms-4 mt-5 text-center" onclick="loadProductInfo(${product.id})" style="cursor: pointer;"> 
                    <p> `+ product.description +`</p>
                    </div>
                    <div class="col-lg-2 ms-2 mt-5 text-end"> 
                        <h6> Costo:   `+ product.cost  + " " + product.currency + `</h6>
                    </div>
                    <div class="col-lg-3 mt-5 text-end"> 
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button class="btn btn-success mx-2" onclick="addToCart(`+ product.id +`)" >Añadir 1 más</button>
                            <button class="btn btn-dark" onclick="removeProduct(`+ i +`)" >Remover</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    showTotalCost()
}


// TOTAL COST AND CURRENCY CONVERSION

function checkSelectedCurrency(){
    if (localStorage.getItem("currency") == "USD"){
        document.getElementById("usdOption").checked = true;
    } else {
        document.getElementById("uyuOption").checked = true;
    }
}

function selectUsd(){
    localStorage.setItem("currency", "USD")
    showTotalCost()
}


function selectUyu(){
    localStorage.setItem("currency", "UYU")
    showTotalCost()
}


function uyuToUsd(){
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].currency == "UYU"){totalCost += cartArray[i].cost / 41} 
        else {totalCost += cartArray[i].cost}
    }   
}

function usdToUyu(){
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].currency == "USD"){totalCost += cartArray[i].cost * 41} 
        else {totalCost += cartArray[i].cost}
    }
}

function showTotalCost(){
    totalCost = 0
    if(localStorage.getItem("currency") == "USD"){
        uyuToUsd()
    } else {
        usdToUyu()
    } 
    document.getElementById("totalCost").innerText = "$" + Math.round(totalCost) + " " + localStorage.getItem("currency") 
}




// HERE I FETCH EVERY PRODUCT IN LOCALSTORAGE

async function cartProductsFetch(){
    for (let i = 0; i < cartProducts.length; i++) {
        let result = await getJSONData(PRODUCT_INFO_URL + cartProducts[i] + ".json")
        let product = result.data
        cartArray.push(product)
    }
    showCart() 
    showTotalCost()
    checkSelectedCurrency()
}


document.addEventListener("DOMContentLoaded", cartProductsFetch)