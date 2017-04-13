var timer; //Handle for Timer object that waits until the Moltin cart data has been retrieved by default.js.

$(document).ready(function() {
  //debugger;
  
  //Disable the checkout button.
  $('.btn--cart-checkout').prop('disabled', true)
  
  //Create a timer that checks if the Moltin with the users shopping cart has been retrieved.
  timer = setTimeout(function() {
    
    try {
      if((moltin.Cart.cartId != undefined) && (moltin.Cart.cartId != "")) {
        //Turn off the timer.
        clearTimeout(timer);

        //Create an Order from the retrieved data.
        createOrder();
      }
    } catch(err) {
      console.error('Problem trying to access moltin.Cart.cartId in checkout.js');
    }
  },500);
  
});

//This function is called when the user clicks the 'Continue to Billing Info' button.
function showBilling(event) {
  //debugger;
  event.preventDefault();
  $(event.currentTarget).fadeOut(); 
  $('#payInfo').fadeIn();
  $('#collapseOne').collapse('show');
  $('#collapseTwo').collapse('show');
}

//This order is called on document load after the Moltin data for this customer has been retrieved.
function createOrder() {
  
  /*
  moltin.Cart.Checkout(function(checkout) {
    debugger;
    
    
  }, function(error) {
    debugger;
    
  });
  */
}