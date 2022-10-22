const PURCHASES_CONTAINER = document.getElementById("purchasesContainer")

function showPurchases() {
    PURCHASES_CONTAINER.innerHTML = "";
    let purchases = JSON.parse(localStorage.getItem("myPurchases"))
    for (let i = 0; i < purchases.length; i++) {
        let product = purchases[i];
        PURCHASES_CONTAINER.innerHTML += `
          <tr class="py-5 align-middle">
              <td scope="row" class="p-1 "><img class="ms-1" src="${product.image
            }" onclick="loadProductInfo(${product.id
            })" style="width:90px;cursor: pointer;"></td>
              <td onclick="loadProductInfo(${product.id
            })" style="cursor: pointer;">${product.name}</td>
              <td>${product.count}</td>
              <td>
              ${product.date}
              </td>
              <td>USD <span id="product${product.id}Subtotal"> $${product.unitCost * product.count
            }</span></td>
          </tr>`;
    }
}


window.onload = showPurchases()