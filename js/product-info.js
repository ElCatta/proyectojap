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
        <div class="col-xl-3 col-lg-6 col-sm-12 text-center"> 
        <img src="` +  product.images[i] + `" alt="product image" class="img-fluid">
        </div>`;    
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
            <div class="col-12">
                <p>
                <b><h5 class="mb-3"> Fotos del artículo: </h5></b>
                </p>
            </div>
        </div> 
        <div class="row">
            `+ productImages() + `
            </div>
            
        <button type="button" onClick="javascript:window.location.href='products.html'" class="righttop btn btn-primary">Volver atrás</button>
        </div>
        
    </div>
    `;
    infoContainer.innerHTML = contentToAppend;
}

// PRODUCT COMMENTS 

function commentRating(commentScore){
    let rating = "";
        for (let i = 0; i < 5; i++) {
            if (i < commentScore)
            {rating += `<span class="fa fa-star checked"></span>`}
            else {rating += `<span class="fa fa-star"></span>`};
        }    
        return rating;
}


function showProductComments(){
    let commentsToAppend = "";
    for (let i = 0; i < comments.length; i++) {
        commentsToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row d-flex mt-4 mb-2">
                    <div class="col-lg-2 col-md-6 mb-md-3 text-md-center ms-lg-4 me-lg-1">
    	                <h4> ` + comments[i].user + ` </h4>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-md-3 text-md-center ms-lg-2 mt-lg-1"> 
                        <span>`+ comments[i].description  +`</span>
                    </div>
                    <div class="col-lg-3 col-md-6 text-md-center me-lg-5"> 
                        <span> `+ commentRating(comments[i].score)  +` </span>
                    </div>
                    <div class="col-lg-1 col-md-6 text-md-center ms-lg-5 text-lg-right"> 
                        <span>`+ comments[i].dateTime  +`</span>
                    </div>
                </div>
            </div>`
    };
    commentsContainer.innerHTML = commentsToAppend;
}

function newComment(){
    commentsContainer.innerHTML += 
    `        <div class="list-group-item list-group-item-action">
                <div class="row d-flex mt-4 mb-2">
                    <div class="col-lg-2 col-md-6 mb-md-4 text-md-center ms-lg-4 me-lg-1">
    	                <h4> ` + document.getElementById("newCommentUsername").value + ` </h4>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-md-4 text-md-center ms-lg-2 mt-lg-1"> 
                        <span>`+ document.getElementById("newCommentText").value  +`</span>
                    </div>
                    <div class="col-lg-3 col-md-6 text-md-center me-lg-5"> 
                        <span> `+ commentRating(parseInt(document.getElementById("newCommentScore").value))  +` </span>
                    </div>
                    <div class="col-lg-1 col-md-6 text-md-center ms-lg-5 text-lg-right"> 
                        <span>`+ "Hace un momento"  +`</span>
                    </div>
                </div>
            </div>`
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
