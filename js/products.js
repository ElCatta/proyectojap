
let PRODUCTS_API = PRODUCTS_URL + localStorage.getItem("catID") + ".json"
let productList = ""
let catNames = { 101: "Autos", 102: "Juguetes", 103: "Muebles", 104: "Herramientas", 105: "Computadoras", 106: "Vestimenta", 107: "Electrodomésticos", 108: "Deporte", 109: "Celulares" };
let rangeMin = document.getElementById("rangeMin");
let rangeMax = document.getElementById("rangeMax");
let searchBar = document.getElementById('browseBar');


// SORTING FUNCTIONALITIES

function sortByPriceDesc(a, b) {
    return a.cost - b.cost
}

function sortByPriceAsc(a, b) {
    return b.cost - a.cost
}

function sortByRel(a, b) {
    return b.soldCount - a.soldCount
}

function productSortMore() {
    showProducts(productList.sort(sortByPriceDesc));
}

function productSortLess() {
    showProducts(productList.sort(sortByPriceAsc));
}

function productSortRel() {
    showProducts(productList.sort(sortByRel));
}

function productsClean() {
    showProducts(productList);
    document.getElementById("rangeMin").value = ""
    document.getElementById("rangeMax").value = "";
}

// SEARCH AND FILTER

function searchAndFilter() {
    let filteredProducts = productList;
    if (rangeMin.value != "") {
        filteredProducts = filteredProducts.filter(product =>
            product.cost > rangeMin.value)
    };
    if (rangeMax.value != "") {
        filteredProducts = filteredProducts.filter(product =>
            product.cost < rangeMax.value)
    };
    if (searchBar.value != "") {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchBar.value.toLowerCase()))
    }
    showProducts(filteredProducts)
}


// SHOW CURRENT CATEGORY TEXT

function catText() {
    document.getElementById("catName").innerText = catNames[localStorage.getItem("catID")]
}

// PRODUCTS PRINTER

function showProducts(list) {
    let htmlContentToAppend = "";
    for (let i = 0; i < list.length; i++) {
        let product = list[i]
        htmlContentToAppend += `
            <div class="shadow border-light col-12 col-md-6 rounded mt-1 mb-4 mb-md-2 px-1 p-lg-3" style="cursor: pointer;">
                <div class="row" onclick="loadProductInfo(${product.id})">
                    <div class="col-12 mb-2">
                        <img style="border:none;" src="${product.image}" alt="product image" class="img-thumbnail border-0 ">
                    </div>
                    <div class="col-12">
                        <h3 class="mb-1"> <strong> $${product.cost} ${product.currency}</strong></h3>     
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
                    <button type="button" onclick="addToLocalCart(`+ product.id + `,1)" class="btn btn-warning btn-sm d-none d-md-block"><h6>Añadir 1 al carrito <i class="fa fa-cart-plus" aria-hidden="true"></i></h6></button>  
                </div>
            </div>
            `
    }
    document.getElementById("container-product-list").innerHTML = htmlContentToAppend;
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


document.getElementById('browseBar').addEventListener('input', searchAndFilter);
document.getElementById("rangeMin").addEventListener('input', searchAndFilter);
document.getElementById("rangeMax").addEventListener('input', searchAndFilter);