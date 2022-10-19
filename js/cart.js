const CART_CONTAINER = document.getElementById("cartContainer");
let subtotalCost = 0;
let cartProducts = "";


///////////////////// PAYMENT VALIDATION SECTION //////////////////////////










////////////////////// PRODUCT & COSTS RELATED SECTION /////////////////////

// COST CALCULATIONS

function costUpdate() {
 subtotalCalc()
 deliveryCostCalc()
 totalCostCalc()
}

function subtotalCalc() {
  subtotalCost = 0
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  for (let i = 0; i < productsCart.length; i++) {
    let product = productsCart[i];
    if (product.currency != "USD") {
      subtotalCost += Math.round((product.unitCost * product.count) / 42.3)
    } else {
      subtotalCost += product.unitCost * product.count;
    }
  }
  document.getElementById("subtotalCost").innerText = "USD " + "$" + subtotalCost
}

function deliveryCostCalc() {
  deliveryCost = 0;
  let selectedMethodValue = document.querySelector('input[name="delivery"]:checked').value;
  deliveryCost = Math.round(subtotalCost * selectedMethodValue);
  document.getElementById("deliveryCost").innerText = "USD " + "$" + deliveryCost;

}

function totalCostCalc() {
  totalcost = subtotalCost + deliveryCost;
  document.getElementById("totalCost").innerText = "USD " + "$" + totalcost;
}

// CHANGE PRODUCT QUANTITY

function changeProductCount(id) {
  let count = document.getElementById("product" + id + "Count").value;
  let subtotalField = document.getElementById("product" + id + "Subtotal");
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));

  productsCart.find((product) => product.id == id).count = count;
  subtotalField.innerText =
    productsCart.find((product) => product.id == id).unitCost *
    productsCart.find((product) => product.id == id).count;

  localStorage.setItem("productsCart", JSON.stringify(productsCart));
  costUpdate();
}

// DELIVERY METHOD SELECTION 

let deliveryMethods = document.querySelectorAll('input[type=radio][name="delivery"]');
deliveryMethods.forEach(radio => radio.addEventListener('change', () => costUpdate()));

// PRINT CART

async function showCartProducts() {
  CART_CONTAINER.innerHTML = "";
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  for (let i = 0; i < productsCart.length; i++) {
    let product = productsCart[i];

    CART_CONTAINER.innerHTML += `
        <tr>
            <th scope="row"><img src="${product.image
      }" onclick="loadProductInfo(${product.id
      })" style="width:65px;cursor: pointer;"></th>
            <td onclick="loadProductInfo(${product.id
      })" style="cursor: pointer;">${product.name}</td>
            <td>${product.currency + " " + product.unitCost}</td>
            <td>
            <input type="number" min="1" id="product${product.id
      }Count" class="form-control" onchange="changeProductCount(${product.id
      })" style="width:80px;" value="${product.count}" required>
            </td>
            <td>${product.currency} <span id="product${product.id}Subtotal"> $${product.unitCost * product.count
      }</span></td>
        </tr>
        `;
  }
  costUpdate();
}

// LOAD CART

window.onload = function initCart() {
  showCartProducts();
};

