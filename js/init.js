const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html"
}

if (localStorage.getItem("productsCart") == undefined) {
  localStorage.setItem("productsCart", "[]")
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


// CART FUNCTIONALITY

async function addToProductsCart(id){
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  if (productsCart.some((element) => element.id == id)){
    productsCart.find(element => element.id == id).count += 1
  } else {
    let productFetch = await getJSONData(PRODUCT_INFO_URL + id + ".json")
    let productInfo = productFetch.data
    let product = {id : id, count : 1, name : productInfo.name, unitCost : productInfo.cost , image : productInfo.images[0], currency : productInfo.currency};
    productsCart.push(product);
  }
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
  cartBadge()
}

function cartBadge(){

  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  console.log(productsCart.length)
  if (productsCart.length >= 1){
    
    document.getElementById("cartBadge").style.display = ""
    document.getElementById("cartBadge").innerText = productsCart.length
  } else {
    document.getElementById("cartBadge").style.display = "none"
  }
}

window.onload = cartBadge()


function productAddSuccess(){
  document.getElementById('alertId').classList.remove('hide')
  document.getElementById('alertId').classList.add('show')
}