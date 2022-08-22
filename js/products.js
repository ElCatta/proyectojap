let PRODUCTS_API = PRODUCTS_URL + localStorage.getItem("catID") + ".json"
let productList = ""
let catNames = {101: "Autos",102: "Juguetes",103: "Muebles",104: "Herramientas",105: "Computadoras",106: "Vestimenta",  107: "Electrodomésticos",108: "Deporte",109: "Celulares"
}   
let sortingStatus, filterStatus = false


// SORTING AND FILTERING FUNCTIONALITIES

function quantitySortingMethod(a,b){
    return b.soldCount - a.soldCount
}

function productSortButton(){
    if (sortingStatus == false){
        sortingStatus = true;
        document.getElementById("sortLabel").classList.add("btn-outline-dark");
        showProducts([...productList].sort(quantitySortingMethod))
    } else { 
        document.getElementById("sortLabel").classList.remove("btn-outline-dark")
        sortingStatus = false
        showProducts(productList)
    }
}

function priceFiltering(){
    
}

// PRODUCTS PRINTER

function showProducts(list){
    let htmlContentToAppend = "";
 for (let i=0; i < productList.length; i++){
    let product = list[i]
    if (product)
    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <p> `+ product.description +`</p> 
                        <br> <br>
                        <h3 class="mb-1"> $` + product.cost + ` ` + product.currency +`</h3> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    document.getElementById("container-product-list").innerHTML = htmlContentToAppend;
    catText();
 }
}

// SHOW CURRENT CATEGORY

function catText(){
    document.getElementById("catName").innerText = catNames[localStorage.getItem("catID")]
}

// PRODUCTS API FETCHING

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_API).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productList = resultObj.data.products;
            console.log(productList)
            showProducts(productList);
        }
    });
});

