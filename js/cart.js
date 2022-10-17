const CART_API = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const CART_CONTAINER = document.getElementById("cartContainer")
let cartProducts = ""


function showCartProducts() {
    for (let i = 0; i < cartProducts.length; i++) {
        let product = cartProducts[i];
        CART_CONTAINER.innerHTML += `
        <tr>
            <th scope="row"><img src="${product.image}" onclick="loadProductInfo(${product.id})" style="width:65px;cursor: pointer;"></th>
            <td onclick="loadProductInfo(${product.id})" style="cursor: pointer;">${product.name}</td>
            <td>${product.currency + " " + product.unitCost}</td>
            <td>
            <input type="number" min="1" class="form-control" onchange="updateSubtotal(${i},${product.unitCost})" style="width:80px;" id="product${i}Quantity" value="${product.count}" required>
            </td>
            <td>${product.currency} <span id="product${i}Subtotal"></span></td>
        </tr>
        `
        updateSubtotal(i, product.unitCost)
    }
}



async function showLocalCartProducts() {
    let localCart = JSON.parse(localStorage.getItem("localCart"))
    for (let i = 0; i < localCart.length; i++) {
        
        let product = await getJSONData(PRODUCT_INFO_URL + localCart[i].id + ".json")
        product = product.data
        console.log(product)


        CART_CONTAINER.innerHTML += `
        <tr>
            <th scope="row"><img src="${product.images[0]}" onclick="loadProductInfo(${product.id})" style="width:65px;cursor: pointer;"></th>
            <td onclick="loadProductInfo(${product.id})" style="cursor: pointer;">${product.name}</td>
            <td>${product.currency + " " + product.cost}</td>
            <td>
            <input type="number" min="1" class="form-control" onchange="updateSubtotal(${cartProducts.length + i},${product.cost})" style="width:80px;" id="product${cartProducts.length + i}Quantity" value="${localCart[i].count}" required>
            </td>
            <td>${product.currency} <span id="product${cartProducts.length + i}Subtotal"></span></td>
        </tr>
        ` 
        updateSubtotal(cartProducts.length + i, product.cost)
    }
}






function updateSubtotal(index, unitCost) {
    let quantityValue = document.getElementById("product" + index + "Quantity").value;
    if (quantityValue >= 0) {
        document.getElementById("product" + index + "Subtotal").innerText = unitCost * quantityValue
    } else {
        document.getElementById("product" + index + "Subtotal").innerText = "0"
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_API).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProducts = resultObj.data.articles;
            showCartProducts()
            showLocalCartProducts()
        }
    });
});