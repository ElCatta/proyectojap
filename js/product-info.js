const PRODUCT_INFO = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("productId") + ".json";
const PRODUCT_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("productId") + ".json";
const RELATED_PRODUCTS = PRODUCTS_URL + localStorage.getItem("catID") + ".json";
const infoContainer = document.getElementById("product-info-container");
const commentsContainer = document.getElementById("product-comments-container");
const relatedProductsContainer = document.getElementById("related-products-container");
const imagesCarousel = document.getElementById("imagesCarousel");
let product, comments = "";


// PRODUCT INFO 

function showProductInfo() {
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
                <h5>`+ product.currency + ` ` + product.cost + `</h5>
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

        <button type="button" onClick="javascript:window.location.href='products.html'" class="righttop btn btn-primary m-2"><span>Volver atrás </span></button>  
        <button type="button" onClick="addToLocalCart(`+ product.id +  `,1  )" class="rightbot btn btn-warning btn-sm m-4"><h5>Añadir <input id="countInput" type="number" style="width:50px; margin-left:5px; margin-right:5px" value="1">al carrito <i class="fa fa-cart-plus" aria-hidden="true"></i></h5></button>  
    </div>`
    infoContainer.innerHTML = contentToAppend;
}

// PRODUCT IMAGES

function showImagesCarousel() {
    imagesCarousel.innerHTML += `
        <div class="carousel-item active"> 
            <img class="d-block w-100" src="` + product.images[0] + `" alt="product image">
        </div>`;
    for (let i = 1; i < product.images.length; i++) {
        imagesCarousel.innerHTML += `
        <div class="carousel-item"> 
            <img class="d-block w-100" src="` + product.images[i] + `" alt="product image">
        </div>`;
    }
}

// PRODUCT COMMENTS 

function commentRating(commentScore) {
    let rating = "";
    for (let i = 0; i < 5; i++) {
        if (i < commentScore) {
            rating += `<span class="fa fa-star checked"></span>`
        } else {
            rating += `<span class="fa fa-star"></span>`
        };
    }
    return rating;
}

function showProductComments() {
    for (let i = 0; i < comments.length; i++) {
        commentsContainer.innerHTML +=
            `<div class="list-group-item list-group-item-action">
                <div class="row d-flex mt-4 mb-2">
                    <div class="col-lg-2 col-md-6 mb-md-3 text-md-center ms-lg-4 me-lg-1">
    	                <h4> ` + comments[i].user + ` </h4>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-md-3 text-md-center ms-lg-2 mt-lg-1"> 
                        <span>`+ comments[i].description + `</span>
                    </div>
                    <div class="col-lg-3 col-md-6 text-md-center me-lg-5"> 
                        <span> `+ commentRating(comments[i].score) + ` </span>
                    </div>
                    <div class="col-lg-1 col-md-6 text-md-center ms-lg-5 text-lg-right"> 
                        <span>`+ comments[i].dateTime + `</span>
                    </div>
                </div>
            </div>`
    };
}

function newComment() {
    commentsContainer.innerHTML +=
        `<div class="list-group-item list-group-item-action">
            <div class="row d-flex mt-4 mb-2">
                <div class="col-lg-2 col-md-6 mb-md-4 text-md-center ms-lg-4 me-lg-1">
    	            <h4> ` + document.getElementById("newCommentUsername").value + ` </h4>
                </div>
                <div class="col-lg-4 col-md-6 mb-md-4 text-md-center ms-lg-2 mt-lg-1"> 
                    <span>`+ document.getElementById("newCommentText").value + `</span>
                </div>
                <div class="col-lg-3 col-md-6 text-md-center me-lg-5"> 
                    <span> `+ commentRating(parseInt(document.getElementById("newCommentScore").value)) + ` </span>
                </div>
                <div class="col-lg-1 col-md-6 text-md-center ms-lg-5 text-lg-right"> 
                    <span>`+ "Hace un momento" + `</span>
                </div>
            </div>
        </div>`
}

// RELATED PRODUCTS

function showRelatedProducts() {
    for (let i = 0; i < 4; i++) {
        if (relatedProducts[i].id != localStorage.getItem("productId")) {
            relatedProductsContainer.innerHTML += `
                <div class="card col-md-4 col-sm-12" onclick="loadProductInfo(${relatedProducts[i].id})">
                <img class="card-img-top" src="`+ relatedProducts[i].image + `" alt="` + relatedProducts[i].name + `">
                    <div class="card-body">
                    <h4 class="card-title text-center">`+ relatedProducts[i].name + `</h4>  
                    </div>
                </div>`;
        }
    }
}



// API FETCH

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            showProductInfo();
            showImagesCarousel();
        }
    });

    getJSONData(PRODUCT_COMMENTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showProductComments();
        }
    });

    getJSONData(RELATED_PRODUCTS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            relatedProducts = resultObj.data.products;
            if (relatedProducts.length > 2) {
                showRelatedProducts()
            } else {
                document.getElementById("related-products-holder").innerHTML = "";
            }
        }
    });
});
