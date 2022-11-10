const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let catNames = { 101: "Autos", 102: "Juguetes", 103: "Muebles", 104: "Herramientas", 105: "Computadoras", 106: "Vestimenta", 107: "Electrodomésticos", 108: "Deporte", 109: "Celulares" };
const userField = document.getElementById("userFieldDropdown");


function dateAndHour() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  return datetime;
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}

if (localStorage.getItem("productsCart") == undefined) {
  localStorage.setItem("productsCart", "[]");
}

if (localStorage.getItem("myPurchases") == undefined) {
  localStorage.setItem("myPurchases", "[]");
}

if (localStorage.getItem("currency") == undefined) {
  localStorage.setItem("currency", "UYU");
}

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

// USER PROFILE

function showUserId() {
  localStorage.getItem("userId") != ""
    ? (userField.innerText = localStorage.getItem("userId"))
    : (userField.innerText = "Usuario");
}

if (window.addEventListener) {
  window.addEventListener("load", showUserId);
}

function logOut() {
  if (confirm("Su información será eliminada, ¿está seguro?") == true) {
    localStorage.clear()
    window.location.replace("index.html");
  } 
}

// PRODUCT INFO ID

function loadProductInfo(id) {
  localStorage.setItem("productId", id);
  window.location = "product-info.html";
}

// LOAD PICTURE IN NAVBAR
function loadNavbarProfilePicture() {
  let profileInfo = JSON.parse(localStorage.getItem("profileInfo"))
  profileInfo.picture == undefined ? null : document.getElementById("navbarPicture").src = profileInfo.picture
}

window.onload = loadNavbarProfilePicture()

// CART

async function addToProductsCart(id) {
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  if (productsCart.some((element) => element.id == id)) {
    productsCart.find((element) => element.id == id).count += 1;
    console.log("count +1");
  } else {
    let product = await getJSONData(PRODUCT_INFO_URL + id + ".json");
    product = {
      id: id,
      count: 1,
      name: product.data.name,
      unitCost: product.data.cost,
      image: product.data.images[0],
      currency: product.data.currency,
    };
    productsCart.push(product);
    console.log("item created");
  }
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
  cartBadge();
}


function cartBadge() {
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  if (productsCart.length >= 1) {
    document.getElementById("cartBadge").style.display = "";
    document.getElementById("cartBadge").innerText = productsCart.length;
  } else {
    document.getElementById("cartBadge").style.display = "none";
  }
}

function purgeCart() {
  productsCart = [];
  localStorage.setItem("productsCart", JSON.stringify(productsCart));
}

window.onload = cartBadge();


// MY PURCHASES

function buyCart() {
  let myPurchases = JSON.parse(localStorage.getItem("myPurchases"));
  let productsCart = JSON.parse(localStorage.getItem("productsCart"));
  for (let i = 0; i < productsCart.length; i++) {
    productsCart[i].date = dateAndHour();
    productsCart[i].totalcost =
      productsCart[i].unitCost * productsCart[i].count;
    myPurchases.push(productsCart[i]);
  }
  localStorage.setItem("myPurchases", JSON.stringify(myPurchases));
  purgeCart();
}
