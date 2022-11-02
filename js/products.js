let PRODUCTS_API = PRODUCTS_URL + localStorage.getItem("catID") + ".json";
let filteredProducts,
  productList = "";
let catNames = {
  101: "Autos",
  102: "Juguetes",
  103: "Muebles",
  104: "Herramientas",
  105: "Computadoras",
  106: "Vestimenta",
  107: "Electrodomésticos",
  108: "Deporte",
  109: "Celulares",
};
let rangeMin = document.getElementById("rangeMin");
let rangeMax = document.getElementById("rangeMax");
let searchBar = document.getElementById("browseBar");

// SORTING FUNCTIONALITIES

function productSortMore() {
  showProducts(filteredProducts.sort((a, b) => a.cost - b.cost));
}

function productSortLess() {
  showProducts(filteredProducts.sort((a, b) => b.cost - a.cost));
}

function productSortRel() {
  showProducts(filteredProducts.sort((a, b) => b.soldCount - a.soldCount));
}

function productsClean() {
  showProducts(productList);
  document.getElementById("rangeMin").value = "";
  document.getElementById("rangeMax").value = "";
  searchBar.value = "";
  filteredProducts = productList;
}

// SEARCH AND FILTER

function searchAndFilter() {
  filteredProducts = productList.filter(
    (product) =>
      (rangeMin.value == "" || product.cost > rangeMin.value) &&
      (rangeMax.value == "" || product.cost < rangeMax.value) &&
      (searchBar.value == "" ||
        product.name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchBar.value.toLowerCase()))
  );
  showProducts(filteredProducts);
}

// SHOW CURRENT CATEGORY TEXT

function catText() {
  document.getElementById("catName").innerText =
    catNames[localStorage.getItem("catID")];
}

// PRODUCTS PRINTER

function showProducts(list) {
  let htmlContentToAppend = "";
  for (let i = 0; i < list.length; i++) {
    let product = list[i];
    htmlContentToAppend += `
            <div class="shadow border-light col-12 col-md-6 rounded mt-1 mb-4 mb-md-2 px-1 p-lg-3" style="cursor: pointer;">
                <div class="row" onclick="loadProductInfo(${product.id})">
                    <div class="col-12 mb-2">
                        <img style="border:none;" src="${product.image}" alt="product image" class="img-thumbnail border-0 ">
                    </div>
                    <div class="col-12">
                        <h3 class="mb-1"> <strong> ${product.currency} $${product.cost} </strong></h3>     
                    </div>
                    <div class="col-7 mt-2">
                        <h5 class="font-weight-strong">${product.name}</h4>     
                    </div>
                    <div class="col-5 mt-2 text-end align-middle pe-3">
                        <small style="word-wrap: break-word" class="text-muted">${product.soldCount} vendidos</small>     
                    </div>
                    <div class="col-12 mt-2">
                        <p> ${product.description}</p>  
                    </div>
                </div>
                <div class="col-12">              
                    <button type="button" onclick="addToProductsCart(${product.id});" class="btn btn-warning btn-sm d-none d-md-block"><h6>Añadir 1 al carrito <i class="fa fa-cart-plus" aria-hidden="true"></i></h6></button>  
                </div>
            </div>
            `;
  }
  document.getElementById("container-product-list").innerHTML =
    htmlContentToAppend;
  catText();
}

// PRODUCTS FETCH

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_API).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productList = resultObj.data.products;
      showProducts(productList);
    }
  });
});

document.getElementById("browseBar").addEventListener("input", searchAndFilter);
