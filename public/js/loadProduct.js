/*
 *  This script file loads products into the DOM based on data retrieved from the Moltin API.
 *  This file is called by the /product KeystoneJS view.
 */

//Global variables
var productId;      //The Moltin Product ID
var publicId;       //The Moltin API Key
var moltin;         //Moltin object used to interact with the API.
var targetProduct;  //Product for this page.
var relatedProducts;//Related products in the store, for displaying the bottom of the page.

$(document).ready(function() {
    
  productId = getProductId();
  
  //Exit the program if no valid product ID was provided.
  if(productId == -1) {
    console.log('No valid product ID was detected, so exiting.');
    loadSlider();
    return;
  }
  
  //Get the Moltin API key from the server
  $.get('/api/moltinplugin/list', '', function(data) {
    //debugger;

    //Retrieve the publicID needed to access the Moltin API.
    publicId = data.collection[0].publicId;
    
    //If the product Id was passed in, then retrieve the data from Moltin.
    if(productId != -1)
      getProductData();

  })
  .fail(function( jqxhr, textStatus, error ) {
    debugger;

    var err = textStatus + ", " + error;
    console.error(err);
    
    loadSlider();
  });
  
});

//This function retrieves the product ID from the URL. 
//If an invalid ID or no ID is provided, this function returns -1.
function getProductId() {
  //debugger;
  
  // RETRIEVE THE URL WHICH CONTAINS THE PASSED IN UNIQUEID
  //Create a variable for the URL (not a string).
  var locate = window.location 
  //Dump the URL data into the hidden form, forcing it into a string of text.
  document.hiddenform.hiddentext.value = locate 
  //Read the URL out of the hidden text box.
  var text = document.hiddenform.hiddentext.value 

  //Only execute if a '=' occurs in the URL.
  if(text.indexOf('=') != -1) {

    //This function retrieves the orderGUID value from the URL string.
    function delineate2(str){
        point = str.lastIndexOf("=");
      
        if(point == -1)
          return -1;
      
        if(str.substring(str.length-1) == "#") {
          return(str.substring(point+1,str.length-1));
        } else {
          return(str.substring(point+1,str.length));  
        }
        
    }

    //retrieve the orderGUID value from the URL.
    return delineate2(text);
    
  } else {
    return -1;
  }
}

//This function is called after the Moltin publicID API key has been retrieved.
//It queries the Moltin server and retrieves product data.
function getProductData() {
  //debugger;
  
  
  moltin = new Moltin({publicId: publicId});

  moltin.Authenticate(function() {
    //debugger;

    moltin.Product.Get(productId, function(product) {
      //debugger;
      
      //Move the product to a global variable
      targetProduct = product;
      
      //Loop through the four thumbnail images.
      for(var i=3; i > -1; i--) {
        
        //Error Handling, blank image if it doesn't exist.
        if(product.images[i] == undefined) {
          //Blank out the image
          //$($('.thumb-image')[i]).find('img').attr('src', "");
          //$($('.thumb-image')[i]).hide();
          $($('.thumb-image')[i]).parent().remove();
          continue;
        }
        
        //Get a handle on the current thumbnail imge.
        var thisImg = $($('.thumb-image')[i]).find('img');
        
        //Replace the image sources with the URL to the image on the Moltin server.
        thisImg.attr('src', product.images[i].url.http);
        thisImg.parent().parent().attr('data-thumb', product.images[i].url.http);
      }
      
      //Replace the product title, description, and price
      $('.grow').find('h2').text(product.title);
      $('#productTitle').text(product.title);
      $('#productDesc').text(product.description);
      $('#productPrice').text('$ '+product.price.data.rounded.without_tax+'.00');
      
      //Load the thumbnail product slider after DOM has been manipulated.
      loadSlider();
      
      //Get related products
      getRelatedProducts();
      
    }, function(error) {
      debugger;
      console.error('Error in loadProduct.js/getProductData(): Product ID could not be retrieved from Moltin API.')
    });
    

  });
  
}

//This function is called by getProductData() after the target product has been loaded into the DOM.
//The purpose of this function is to load three other products from the Moltin server as related products
//at the bottom of the page.
function getRelatedProducts() {
  //debugger;
  
  moltin.Product.List(null, function(products) {
    //debugger;

    //Pick three products at random that are not the target product.
    relatedProducts = getRandomProducts(targetProduct, products);

    //Loop three times, once for each related product
    for(var i=0; i < 3; i++) {
      var thisElem = $($('.relatedProduct')[i]);
      
      thisElem.find('.tun').text(relatedProducts[i].title);
      thisElem.find('.item_price').text('$ '+relatedProducts[i].price.data.rounded.without_tax+'.00');
      thisElem.find('img').attr('src', relatedProducts[i].images[0].url.http)
      thisElem.find('.product-at').find('a').attr('href', '/product?productId='+relatedProducts[i].id);
    }
    

  }, function(error) {
    console.log('Error in loadProduct.js/getProductData(): Could not communicate with the Moltin server!');
  });
}

//This function is used to retrieve three random products from the allProds array that are not the target product.
function getRandomProducts(targProd, allProds) {
  //debugger;
  
  var selectedProds = [];
  var index = 0;
  
  do {
    //http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
    var item = allProds[Math.floor(Math.random()*allProds.length)];
    
    
    if(item.id != targProd.id) {
      
      //Skip if this product has already been picked.
      var duplicate = false;
      for(i = 0; i < index; i++) {
        if(selectedProds[i].id == item.id)
          duplicate = true;
      }
      
      if(!duplicate) {
        selectedProds.push(item);
        index++;
      }
    }
    
  } while(selectedProds.length < 3);
 
  return selectedProds;
}