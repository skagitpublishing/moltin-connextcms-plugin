//This file contains JavaScript code that needs to be executed by default.hbs, which controlls the
//nav menu and footer of every page on the site.

//Global Variables
var publicId;       //The Moltin API Key
var moltin;         //Moltin object used to interact with the API.
var productId;      //The Moltin Product ID 

//This function opens the cart slide-out. It is called when the user clicks the shopping cart icon in the top right corner.
function openCart() {
  //debugger;
  
  $('.cart').toggleClass('js-active');
}

/* Click handler for Close Cart 'X' icon
============================================================ */
function closeCart() {
 $('.cart .btn--close').click(function () {
   $('.cart').removeClass('js-active');
 });
}



$(document).ready(function() {
    
  //Attach the close function to the x in the shopping cart slide-out
  closeCart();
  
  //Get the Moltin API key from the server
  $.get('/api/moltinplugin/list', '', function(data) {
    //debugger;

    //Retrieve the publicID needed to access the Moltin API.
    publicId = data.collection[0].publicId;

    //Retrieve the cart ID from the cookie.
    moltin = new Moltin({publicId: publicId});

    moltin.Authenticate(function() {
    
      //Load the shopping cart for this user.
      loadCart();

      productId = getProductId();

      //Exit the program if no valid product ID was provided.
      if(productId == -1) {
        console.log('No valid product ID was detected, so exiting.');
        //loadSlider();
        return;
      }

      //If the product Id was passed in, then retrieve the data from Moltin.
      if(productId != -1)
        getProductData();
      
    });

  })
  .fail(function( jqxhr, textStatus, error ) {
    debugger;

    var err = textStatus + ", " + error;
    console.error(err);

    loadSlider();
  });
});



//This function is called after authenticating with the Moltin API.
//It loads any pre-created cart for the current user, or loads a new cart otherwise.
function loadCart() {
  //debugger;

  var cookie = $.cookie();

  var cart;
  //Create a new cart and save it's ID to the cookie, if one has not been created yet.
  if(cookie.cartId == undefined) {

    $.cookie('cartId', moltin.Cart.cartId);

    //Add the checkout URL to the checkout button.
    //$('.btn--cart-checkout').on('click', function() {
    //  window.location.href = cart.checkoutUrl;
    //});

  //Retrieve the cart from the Shopify server.
  } else {
    //debugger;
    
    moltin.Cart.cartId = cookie.cartId;

    renderCartContents();
    
    //Add the checkout URL to the checkout button.
    //$('.btn--cart-checkout').on('click', function() {
    //  window.location.href = cart.checkoutUrl;
    //});

  }
  
}


//This function retrieves the product ID from the URL. 
//If an invalid ID or no ID is provided, this function returns -1.
function getProductId() {
  //debugger;
  
  // RETRIEVE THE URL WHICH CONTAINS THE PASSED IN UNIQUEID
  //Create a variable for the URL (not a string).
  var locate = window.location 
  //Dump the URL data into the hidden form, forcing it into a string of text.
  //document.hiddenform.hiddentext.value = locate 
  $('#hiddentext').val(locate);
  //Read the URL out of the hidden text box.
  //var text = document.hiddenform.hiddentext.value 
  var text = $('#hiddentext').val();

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

//This is a utility function that is called any time the cart needs to be refreshed and the items it displayed.
function renderCartContents() {
  //debugger;
  
  //The container displaying the cart items.
  var $cartItemContainer = $('.cart-item-container');
  
  //Empty the cart DOM container.
  $cartItemContainer.empty();
  
  //Load the template
  var lineItemEmptyTemplate = $('#cart-item-template').html();
  
  openCart();
  
  //Retrieve the contents of the Cart.
  moltin.Cart.Contents(function(items) {
    //debugger;  
    //console.log(items);
    
    //Convert the contents from an object to an array
    var contents = Object.keys(items.contents);
    
    //If there are no items in the cart, then nothing to do.
    if(contents.length == 0)
      return;
    
    //Loop through each item in the cart.
    for(var i=0; i < contents.length; i++) {
    
      //The current item we're trying to display in the cart.
      var thisItem = items.contents[contents[i]];
      
      //Get a handle on the template and the image URL from the Moltin server.
      var $lineItemTemplate = $(lineItemEmptyTemplate);
      var itemImage = thisItem.images[0].url.http;
      
      //Update the template with the information.
      $lineItemTemplate.find('.item-image').attr('src', itemImage);
      $lineItemTemplate.find('.item-title').text(thisItem.name);
      $lineItemTemplate.find('.item-price').text('$'+thisItem.price);
      $lineItemTemplate.find('.item-quantity').text('Qty: '+thisItem.quantity);
      
      //Add the modified template to the DOM.
      $cartItemContainer.append($lineItemTemplate);
    }
    
    //Display the cart price total.
    $('.pricing--no-padding').text('$'+items.totals.post_discount.raw.without_tax);
    
  }, function(error) {
    debugger;
    
  });
  
}

//This function is called when the user clicks the Checkout button.
function startCheckout() {
  debugger;
  
  window.location.href = '/checkout';
  
}