var CARS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
productList = ""
htmlContentToAppend = 
fetch (CARS_URL)
    .then(function (res){
        return res.json();
    })
    .then(function(data) {
        productList = data.products;
    });
    
function showProducts(){
 for (let i=0; i < productList.length; i++){
     console.log("1")
     htmlContentToAppend += `
     <div class="productos contenedor">
         <div class="fila">
             <div>
                 <img src="` + productList[i].image + `" alt="product image" class="img-thumbnail">
             </div>
             <div class="col">
                 
             </div>
         </div>
     </div>
     `
     document.getElementById("container-product-list").innerHTML = htmlContentToAppend; 
      
 }
}



