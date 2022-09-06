let productURL = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("productId") + ".json"
let infoContainer = document.getElementById("product-info-container");

function showProductInfo(){
    contentToAppend = `
    <div  class="list-group-item list-group-item-action">
        <div class="row">
                <div class="col-12">
                <h3 class="mb-3"> ` + product.name + ` </h3>
                </div>      
        </div>
        <div class="row">
        <div class="col-12">
                <p>
                <b><h5 class="mb-3"> Precio: </h5></b>
                <h5>`+ product.currency + ` `+ product.cost + `</h5>
                </p>
        </div>
        </div>
        <div class="row">
        <div class="col-12">
                <p>
                <b><h5 class="mb-3"> Descripción: </h5></b>
                <h5>`+ product.description + `</h5>
                </p>
        </div>
        </div>
        <div class="row">
        <div class="col-12">
                <p>
                <b><h5 class="mb-3"> Categoría: </h5></b>
                <h5>`+ product.category + ` </h5>
                </p>
        </div>
        </div>
        <div class="row">
        <div class="col-12">
                <p>
                <b><h5 class="mb-3"> Cantidad vendidos: </h5></b>
                <h5>`+ product.soldCount + `</h5>
                </p>
        </div>
        </div>  
    </div>
    `
    infoContainer.innerHTML = contentToAppend + addImages()
}

 function addImages(){
     let images = product.images
     let imagesToAppend = ""
     for (let i=0; i < images.length; i++){
         imagesToAppend += `
         <img src="` + images[i] + `" alt="product image" class="img-fluid">
         `
     }
     return imagesToAppend
 }


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(productURL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            console.log(product)
            showProductInfo()
        }
    });
});