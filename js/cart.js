let cartArray = [];
let cartProducts = JSON.parse(localStorage.getItem("cart"))
let cartContainer = document.getElementById("cartContainer")


// HERE I SHOW EVERY PRODUCT INFO SAVED IN cartArray

function showCart(){
    for (let i = 0; i < cartArray.length; i++) {
        const product = cartArray[i];
        cartContainer.innerHTML += `
            <div class="list-group-item list-group-item-action">
                <div class="row d-flex mt-3 mb-2 ms-4 mb-4">
                    <div class="col-lg-2 text-center">
    	                <h5 class="ms-4 mb-2"> ` + product.name + ` </h5>
                        <img style="width: 200px"src="`+ product.images[0] +`">
                    </div>
                    <div class="col-lg-6 me-5"> 
                    </div>
                    <div class="col-lg-2 ms-5 mt-5 text-end"> 
                        <h6> Costo:   `+ product.cost  + " " + product.currency + `</h6>
                    </div>
                </div>
            </div>`;
    }
}


// HERE I FETCH EVERY PRODUCT IN LOCALSTORAGE

async function cartProductsFetch(){
    for (let i = 0; i < cartProducts.length; i++) {
        let result = await getJSONData(PRODUCT_INFO_URL + cartProducts[i] + ".json")
        let product = result.data
        cartArray.push(product)
    }
    showCart()
}


document.addEventListener("DOMContentLoaded", cartProductsFetch)