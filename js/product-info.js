let PRODUCT_INFO = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("productId") + ".json"
let infoContainer = document.getElementById("product-info-container");
let PRODUCT_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/"  + localStorage.getItem("productId") + ".json"
let product, comments = ""


// API FETCH


function addImages(){
    let imagesToAppend = "" 
    for (let i=0; i < product.images.length; i++){
         imagesToAppend += `
         <img src="` +  product.images[i] + `" alt="product image" class="img-fluid">`
    }
    return imagesToAppend
}



function showProductInfo(){
    contentToAppend = `
    <div class="row">
                <div class="col-12">
                <b><h3 class="mb-3 mt-5 mb-3"> ` + product.name + ` </h3></b>
                </div>      
        </div>
    <div  class="list-group-item list-group-item-action">
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
        <div class="row">
        <div class="col-3">
                <p>
                <b><h5 class="mb-3"> Fotos del artículo: </h5></b>
                </p>
        </div>
        </div> 
        <div class="row">
            <div class="column">
            `+ addImages() + `
            </div>
        </div>
        
        <button type="button" onClick="javascript:window.location.href='products.html'" class="righttop btn btn-primary">Volver atrás</button>
    </div>
    `
    infoContainer.innerHTML = contentToAppend 
}


function addComments(){
    let commentsToAppend = ""
    for (let i = 0; i < comments.length; i++) {
        let rating = ""
        for (let s = 0; s < comments[i].score; s++) {
            rating += `<span class="fa fa-star checked"></span>`}
        for (let s = 0; s < 5 - comments[i].score; s++) {
            rating += `<span class="fa fa-star"></span>`}
        commentsToAppend += `
            <div class="row p-5 border border-secondary d-flex position-relative">
                <div class="d-flex justify-content">
    	            <h4> ` + comments[i].user + ` </h4>
                    <div class="container ml-3 w-25"> `+ comments[i].dateTime  +`</p>
                    </div>
                    <div class="container ml-5"> `+ comments[i].description  +`</p>
                    </div>
                    <div class="container"> `+ rating  +`</p>
                    </div>
                </div>

            </div>`
    }

    document.getElementById("product-comments-container").innerHTML += commentsToAppend
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            showProductInfo()
        }
    });
    getJSONData(PRODUCT_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data
            addComments()
        }
    });
});
