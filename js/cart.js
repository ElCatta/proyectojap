const CART_CONTAINER = document.getElementById("cartContainer")
let cartProducts = ""



// SHOW CART
async function showCartProducts() {
    CART_CONTAINER.innerHTML = ""
    let productsCart = JSON.parse(localStorage.getItem("productsCart"))
    for (let i = 0; i < productsCart.length; i++) {
        let product = productsCart[i]

        CART_CONTAINER.innerHTML += `
        <tr>
            <th scope="row"><img src="${product.image}" onclick="loadProductInfo(${product.id})" style="width:65px;cursor: pointer;"></th>
            <td onclick="loadProductInfo(${product.id})" style="cursor: pointer;">${product.name}</td>
            <td>${product.currency + " " + product.unitCost}</td>
            <td>
            <input type="number" min="1" id="product${product.id}Count" class="form-control" onchange="changeProductCount(${product.id})" style="width:80px;" value="${product.count}" required>
            </td>
            <td>${product.currency} <span id="product${product.id}Subtotal"> $${product.unitCost * product.count}</span></td>
        </tr>
        `
    }
}



// CAMBIAR CANTIDAD DE PRODUCTO

function changeProductCount(id) {
    let count = document.getElementById("product" + id + "Count").value
    let subtotalField = document.getElementById("product" + id + "Subtotal")
    let productsCart = JSON.parse(localStorage.getItem("productsCart"));
    
    productsCart.find(product => product.id == id).count = count
    subtotalField.innerText = productsCart.find(product => product.id == id).unitCost * productsCart.find(product => product.id == id).count

    localStorage.setItem("productsCart", JSON.stringify(productsCart));
}



// LOAD CART

window.onload = function initCart() { 
    showCartProducts()
} 

