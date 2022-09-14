const PRODUCT_INFO = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("productId") + ".json";
const PRODUCT_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/"  + localStorage.getItem("productId") + ".json";
const infoContainer = document.getElementById("product-info-container");
const commentsContainer = document.getElementById("product-comments-container");
let product, comments = "";


// PRODUCT INFO 

function productImages(){
    let imagesToAppend = "" 
    for (let i=0; i < product.images.length; i++){
        imagesToAppend += `
        <img src="` +  product.images[i] + `" alt="product image" class="img-fluid">`;
    }
    return imagesToAppend
}

function showProductInfo(){
    let contentToAppend = `
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
        <div class="imageContainer my-2m,">
            <div class="imagesColumn">
            `+ productImages() + `
            </div>
        </div>
        
        <button type="button" onClick="javascript:window.location.href='products.html'" class="righttop btn btn-primary">Volver atrás</button>
    </div>
    `;
    infoContainer.innerHTML = contentToAppend;
}

// PRODUCT COMMENTS 

function commentRating(comment){
    let rating = "";
        for (let i = 0; i < 5; i++) {
            if (i < comment.score)
            {rating += `<span class="fa fa-star checked"></span>`}
            else {rating += `<span class="fa fa-star"></span>`};
        }    
        return rating;
}

function showProductComments(){
    let commentsToAppend = "";
    for (let i = 0; i < comments.length; i++) {

        commentsToAppend += `
            <div class="row p-4 border border-dark d-flex w-100">
                <div class="d-flex">
                    <div class="container px-2 w-25 border border-secondary">
    	                <h4> ` + comments[i].user + ` </h4>
                    </div>
                    <div class="container ml-3 w-50"> 
                        <span>`+ comments[i].description  +`</span>
                    </div>
                    <div class="container w-25"> 
                        <span> `+ commentRating(comments[i])  +` </span>
                    </div>
                    <div class="container ml-2 w-25"> 
                        <span>`+ comments[i].dateTime  +`</span>
                    </div>
                </div>
            </div>`
    };
    commentsContainer.innerHTML = commentsToAppend;
}



// API FETCHING

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            showProductInfo();
        }
    });
    getJSONData(PRODUCT_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            showProductComments();
        }
    });
});
