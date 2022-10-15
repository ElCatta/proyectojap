const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

if (localStorage.getItem("localCart") == undefined) {
  localStorage.setItem("localCart", "[]")
}

if (localStorage.getItem("currency") == undefined) {
  localStorage.setItem("currency", "UYU")
}


let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

// USER PROFILE

function showUserId() {
  if (localStorage.getItem("userId") != "") {
    document.getElementById("userFieldDropdown").innerText = localStorage.getItem("userId");
  } else {
    document.getElementById("userFieldDropdown").innerText = "Usuario";
  }
}

if (window.addEventListener) {
  window.addEventListener('load', showUserId);
}

function logOut() {
  localStorage.setItem("userId", "");
  window.location.replace("home.html");
}


// PRODUCT ID

function loadProductInfo(id) {
  localStorage.setItem("productId", id);
  window.location = "product-info.html";
}


// LOCAL CART

function addToLocalCart(id){
  let localCart = JSON.parse(localStorage.getItem("localCart"));
  if (localCart.some((element) => element.id == id)){
    localCart.find(element => element.id == id).count += 1
  } else {
    let product = {id : id, count : 1};
    localCart.push(product);
  }
  localStorage.setItem("localCart", JSON.stringify(localCart));
  console.log("item added")
}


function productAddSuccess(){
  document.getElementById('alertId').classList.remove('hide')
  document.getElementById('alertId').classList.add('show')
}