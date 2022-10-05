const CART_API = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const CART_CONTAINER = document.getElementById("cartContainer")
let cartProducts = ""


function showCartProducts() {
    for (let i = 0; i < cartProducts.length; i++) {
        let product = cartProducts[i];
        CART_CONTAINER.innerHTML += `
        <tr>
            <th scope="row"><img src="${product.image}" style="width:65px;"></th>
            <td>${product.name}</td>
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
        }
    });
});