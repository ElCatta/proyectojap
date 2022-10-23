const CART_CONTAINER = document.getElementById("cartContainer");
const bankAccountMethod = document.getElementById("bankAccountMethod");
const creditCardMethod = document.getElementById("creditCardMethod");

const creditCardNumber = document.getElementById("creditCardNumber");
const securityCode = document.getElementById("securityCode");
const creditCardExp = document.getElementById("creditCardExp");
const bankAccountNumber = document.getElementById("bankAccountNumber")

let subtotalCost = 0;
let cartProducts = "";


///////////////////// PAYMENT SECTION //////////////////////////


function paymentSuccess() {
  document.getElementById("main").innerHTML += `<div class="alert alert-success" role="alert">
  La compra ha sido realizada correctamente!
  </div>`
}


function purchaseSuccessfulAlert() {
  document.getElementById("main").innerHTML = `
    <div class="container ">
      <div class="list-group-item list-group-item-active mt-5 text-center">
      <div class="row"> 
      <div class="col mt-3">
      <img class="image-fluid" src="../img/success.png" style="width:120px;">
      </div>  
      </div>
      <div class="row"> 
          <div class="col mt-4 ">
            <h2>La compra ha sido realizada corréctamente</h2>
          </div>
        </div>
        <div class="row"> 
          <div class="col mt-4 text-center">
            <button class="btn-lg btn-success mb-4" onclick="location.href='my-purchases.html';"> Ver mis compras</button>
          </div>
        </div>
      </div>
    </div>`
}


// BOOTSTRAP VALIDATIONS

(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else{
          paymentSuccess()
          buyCart()
          purchaseSuccessfulAlert()
        }
      
        form.classList.add('was-validated')
      }, false)
    })
})()



// PAYMENT METHOD SELECTION

function selectBankAccount() {
  bankAccountNumber.removeAttribute("disabled", "")

  creditCardNumber.setAttribute("disabled", "")
  securityCode.setAttribute("disabled", "")
  creditCardExp.setAttribute("disabled", "")
}


function selectCreditCard() {
  creditCardNumber.removeAttribute("disabled", "")
  securityCode.removeAttribute("disabled", "")
  creditCardExp.removeAttribute("disabled", "")

  bankAccountNumber.setAttribute("disabled", "")

}

function validatePaymentMethod() {
  if (document.getElementById("creditCardMethod").checked && creditCardNumber.checkValidity() && securityCode.checkValidity() && creditCardExp.checkValidity()) {
    document.getElementById("paymentMethodStatus").innerText = "Tarjeta de credito seleccionada"
    document.getElementById("paymentMethodStatus").style.color = "green"
  } else if (document.getElementById("bankAccountMethod").checked && bankAccountNumber.checkValidity()) {
    document.getElementById("paymentMethodStatus").innerText = "Cuenta bancaria seleccionada"
    document.getElementById("paymentMethodStatus").style.color = "green"
  } else {
    document.getElementById("paymentMethodStatus").innerText = "No ha seleccionado"
    document.getElementById("paymentMethodStatus").style.color = "red"
  }
}


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

// MANAGE PRODUCTS

function removeProductFromCart(id) {
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  productsCart = productsCart.filter(product => product.id != id)
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
  if (productsCart.length != 0) {
    showCartProducts()
  } else {
    emptyCartAlert()
  }
  cartBadge()
}


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


// PRINT CART

async function showCartProducts() {
  CART_CONTAINER.innerHTML = "";
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  for (let i = 0; i < productsCart.length; i++) {
    let product = productsCart[i];

    CART_CONTAINER.innerHTML += `
        <tr class="py-5 align-middle">
            <td scope="row" class="p-1 "><img class="ms-1" src="${product.image
      }" onclick="loadProductInfo(${product.id
      })" style="width:90px;cursor: pointer;"></td>
            <td onclick="loadProductInfo(${product.idfF
      })" style="cursor: pointer;">${product.name}</td>
            <td>${product.currency + " " + product.unitCost}</td>
            <td>
            <input type="number" min="1" id="product${product.id
      }Count" class="form-control" onchange="changeProductCount(${product.id
      })" style="width:80px;" value="${product.count}" required>
            </td>
            <td>${product.currency} <span id="product${product.id}Subtotal"> $${product.unitCost * product.count
      }</span></td>
      <td>
      <button class="btn btn-danger " onclick="removeProductFromCart(${product.id})"><i class="fa-solid fa-trash-can"></i></button>
      </td>
        </tr>`;
  }
  costUpdate();
}


// EMPTY CART ALERT

function emptyCartAlert() {
  document.getElementById("main").innerHTML = `
    <div class="container">
      <div class="list-group-item list-group-item-active mt-5">
        <div class="row"> 
          <div class="col mt-5 text-center">
            <h2>Oh, parece que no hay productos en tu carrito</h2>
          </div>
        </div>
        <div class="row"> 
          <div class="col mt-5 text-center">
            <button class="btn-lg btn-primary mb-4" onclick="location.href='categories.html';"> Volver a la tienda</button>
          </div>
        </div>
      </div>
    </div>`
}


// LOAD CART

window.onload = function initCart() {
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  if (productsCart.length == 0) {
    emptyCartAlert();
  } else {
    showCartProducts()
  }
};


// DELIVERY METHOD SELECTION EVENT

let deliveryMethods = document.querySelectorAll('input[type=radio][name="delivery"]');
deliveryMethods.forEach(radio => radio.addEventListener('change', () => costUpdate()));
