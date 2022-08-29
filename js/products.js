let PRODUCTS_API = PRODUCTS_URL + localStorage.getItem("catID") + ".json"
let productList = ""
let catNames = {101: "Autos",102: "Juguetes",103: "Muebles",104: "Herramientas",105: "Computadoras",106: "Vestimenta",  107: "Electrodomésticos",108: "Deporte",109: "Celulares"
}   ;
let sortingStatus, filterStatus = false;
let searchBar = document.getElementById('browseBar');




// SORTING FUNCTIONALITIES

function sortByPriceDesc(a,b){
    return a.cost - b.cost  
}

function sortByPriceAsc(a,b){
    return b.cost - a.cost
}

function sortByRel(a,b){
    return b.soldCount - a.soldCount
}

function productSortMore(){
    showProducts(productList.sort(sortByPriceDesc));
}

function productSortLess(){
    showProducts(productList.sort(sortByPriceAsc));
}

function productSortRel(){
    showProducts(productList.sort(sortByRel));
}

function productsClean(){
    showProducts(productList);
    document.getElementById("rangeMin").value = undefined;
    document.getElementById("rangeMax").value = undefined;
    search()
}



// PRODUCTS PRINTER

function showProducts(list){
    let htmlContentToAppend = "";
 for (let i=0; i < list.length; i++){
    let product = list[i]
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
 }
 document.getElementById("container-product-list").innerHTML = htmlContentToAppend;
    catText();
}

// SHOW CURRENT CATEGORY TEXT

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

// FILTRO Y DESAFIATE(BUSQUEDA)

function searchAndFilter(){
    items = [];
    for (let i=0; i < productList.length; i++){
            product = productList[i]
        if ((searchBar.value == "" || product.name.toLowerCase().includes(searchBar.value.toLowerCase()) || 
            product.description.toLowerCase().includes(searchBar.value.toLowerCase())) && 
            ((document.getElementById("rangeMin").value == '' || product.cost > document.getElementById("rangeMin").value) && 
            (document.getElementById("rangeMax").value == '' || product.cost < document.getElementById("rangeMax").value)))
        {
            items.push(product)
        } 
    }
    showProducts(items)
    }

    
searchBar.addEventListener('input', searchAndFilter)
