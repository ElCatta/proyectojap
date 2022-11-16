const PRODUCT_INFO =
  "https://japceibal.github.io/emercado-api/products/" +
  localStorage.getItem("productId") +
  ".json";
const PRODUCT_COMMENTS =
  "https://japceibal.github.io/emercado-api/products_comments/" +
  localStorage.getItem("productId") +
  ".json";
const infoContainer = document.getElementById("product-info-container");
const commentsContainer = document.getElementById("product-comments-container");
const relatedProductsContainer = document.getElementById(
  "related-products-container"
);
const thumbnailContainer = document.getElementById("thumbnail-container")
const thumbnail = document.getElementById("image-thumbnail")
let product, comments = "";


// PRODUCT IMAGE ZOOM //

// DESKTOP

function desktopZoomStart(e) {
  const x = e.clientX - e.target.offsetLeft;
  const y = e.clientY - e.target.offsetTop;
  thumbnail.style.transformOrigin = `${x}px ${y}px`;
  thumbnail.style.transform = "scale(2)"
  thumbnail.style.cursor = "zoom-in"
}
function desktopZoomStop() {
  thumbnail.style.transformOrigin = "center";
  thumbnail.style.transform = "scale(1)"
}

thumbnailContainer.addEventListener("mousemove", desktopZoomStart)
thumbnailContainer.addEventListener("mouseleave", desktopZoomStop)

// MOBILE 

function mobileZoomStart(e) {
  x = e.touches[0].clientX - e.target.offsetLeft;
  y = e.touches[0].clientY - e.target.offsetTop;
  thumbnail.style.transformOrigin = `${x}px ${y}px`;
  thumbnail.style.transform = "scale(2)"
}
function mobileZoomStop() {
  thumbnail.style.transformOrigin = "center";
  thumbnail.style.transform = "scale(1)"
}

thumbnailContainer.addEventListener("touchstart", mobileZoomStart)
thumbnailContainer.addEventListener("touchmove", mobileZoomStart)
thumbnailContainer.addEventListener("touchend", mobileZoomStop)


// SELECT PRODUCT COUNT

async function productCount() {
  for (let i = 0; i < document.getElementById("inputCount").value; i++) {
    await addToProductsCart(product.id);
  }
}


// SHOW RELATED PRODUCTS

function showRelatedProducts() {
  for (let i = 0; i < product.relatedProducts.length; i++) {
    let relatedProduct = product.relatedProducts[i]
    relatedProductsContainer.innerHTML += ` 
        <div style="cursor:pointer;" class="card col-md-4 col-4 popout p-0" onclick="loadProductInfo(${relatedProduct.id})">
          <img class="card-img-top" src="${relatedProduct.image}" alt="${relatedProduct.name}">
          <div class="card-body">
            <h4 class="card-title text-center">${relatedProduct.name} </h4>  
          </div>
       </div>`;
  }
}




// COMMENT RATING

function commentRating(commentScore) {
  let rating = "";
  for (let i = 0; i < 5; i++) {
    if (i < commentScore) {
      rating += `<span class="fa fa-star checked"></span>`;
    } else {
      rating += `<span class="fa fa-star"></span>`;
    }
  }
  return rating;
}


// POST NEW COMMENT 

function newComment() {
  commentsContainer.innerHTML +=

    `<div class="row">
        <div class="col px-4 pt-4 pb-2 shadow">
          <div class="row">
            <span>${commentRating(parseInt(document.getElementById("newCommentScore").value))}</span>
          </div>
          <div class="row mt-3">
            <div class="col">
              <span>${document.getElementById("newCommentUsername").value}</span>
            </div>
            <div class="col text-end me-2 text-muted">
              <span>Hace un momento</span>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col ">
            <p class="text-break">${document.getElementById("newCommentText").value}</p>
            </div>
          </div>  
        </div>
      </div>`
}


// SHOW COMMENTS

function showProductComments() {

  for (let i = 0; i < comments.length; i++) {
    commentsContainer.innerHTML +=
      `<div class="row">
          <div class="col px-4 pt-4 pb-2 shadow">
            <div class="row">
              <span>${commentRating(comments[i].score)}</span>
            </div>
            <div class="row mt-3">
              <div class="col">
                <span>${comments[i].user}</span>
              </div>
              <div class="col text-end me-2 text-muted">
                <span>${comments[i].dateTime}</span>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <p class="text-break">${comments[i].description}</p>
              </div>
            </div>
          </div>
      </div>`
  }
}


// CHANGE THUMBNAIL

async function changeThumbnail(index) {
  let newThumbnail = await document.getElementById("imageRow" + index).src
  thumbnail.src = newThumbnail
}

// SHOW PRODUCT IMAGES

function showImages() {
  for (let i = 0; i < product.images.length; i++) {
    const image = product.images[i];
    document.getElementById("images-row").innerHTML += `
    <div class="row pb-1">
      <div class="text-center pe-2 pe-md-4 pe-lg-2">
        <img src="${image}" style="width:80px; cursor:pointer;" id="imageRow${i}" onclick="changeThumbnail(${i})" class="img-fluid float-end p-0" alt="">
      </div>
    </div>`
  }
  thumbnail.src = product.images[0]
}

// SHOW PRODUCT INFO

function showProductInfo() {
  let contentToAppend = `
    <span class="text-muted d-none d-md-block">Inicio/Autos</span>
    <h3 class="py-2">${product.name}</h3>
    <h2 class="pb-3 fw-bold">${product.currency} $${product.cost}</h2>
    <input type="number" style="width:40px;" value="1" name="" min="1" id="inputCount">
    <button type="button"  class="btn btn-warning p-2" id="addToCartBtn"> Añadir al carrito</button>
    <h3 class="pt-3 pb-1 d-md-none d-lg-block">Detalles del producto</h3>
    <p class="d-md-none d-lg-block">${product.description}</p>
 `;
  infoContainer.innerHTML = contentToAppend;
  document.getElementById("altProductDesc").innerText = product.description
}


// PRODUCT DATA FETCH //

document.addEventListener("DOMContentLoaded", (e) => {

  // PRODUCT INFO

  getJSONData(PRODUCT_INFO).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
      showProductInfo();
      showImages()
      showRelatedProducts();

      document
        .getElementById("addToCartBtn")
        .addEventListener("click", productCount);
    }
  });

  // PRODUCT COMMENTS

  getJSONData(PRODUCT_COMMENTS).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comments = resultObj.data;
      showProductComments();
    }
  });

});
