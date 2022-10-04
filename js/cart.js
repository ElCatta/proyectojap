const CART_API = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const CART_CONTAINER = document.getElementById("cartContainer")
let cartProducts = ""




function showCartProducts(){
    for (let i = 0; i < cartProducts.length; i++) {
        let product = cartProducts[i];
        CART_CONTAINER.innerHTML += `
        <tr>
            <th scope="row"><img src="${product.image}" style="width:60px;"></th>
            <td>${product.name}</td>
            <td>${product.currency + " " + product.unitCost}</td>
            <td>
            <input type="text" class="form-control" style="width:40px;" id="product${i}Quantity" value="${product.count}" required>
            </td>
            <td>TO BE DEVELOPED</td>
        </tr>
        `
        
    }
}





document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_API).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartProducts = resultObj.data.articles;
            showCartProducts()
        }
    });
});