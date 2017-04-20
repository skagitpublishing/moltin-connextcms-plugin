var timer; //Handle for Timer object that waits until the Moltin cart data has been retrieved by default.js.

//This function runs after the page finished loading.
$(document).ready(function() {
  //debugger;
  
  //Disable the checkout button.
  $('.btn--cart-checkout').prop('disabled', true)
  
  //Create a timer that checks if the Moltin object with the users shopping cart has been retrieved.
  timer = setTimeout(function() {
    
    try {
      if((moltin.Cart.cartId != undefined) && (moltin.Cart.cartId != "")) {
        //Turn off the timer.
        clearTimeout(timer);

        //Create an Order from the retrieved data.
        renderPage();
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
function renderPage() {
  //debugger;
  
  //Display the Cart total price on the page.
  moltin.Cart.Contents(function(items) {
    //debugger;
    
    //Display the cart price total.
    $('#order-total').text('$'+items.totals.post_discount.raw.without_tax);
    
  //An error occured.
  }, function(error) {
    debugger;
    
  });
  
}


//This function is called by the DOM form when the submit button is clicked.
function createOrder(event) {
  //debugger;
  
  event.preventDefault();
  
  //Prepare to checkout be retrieving all information about the Cart.
  //https://docs.moltin.com/endpoints/checkout#retrieve-the-available-checkout-options
  moltin.Cart.Checkout(function(checkout) {
    //debugger;
    //console.log(checkout);
    
    //Collect the user information from the form
    var customerInfo = {
      first_name: $('#id_first_name').val(),
      last_name: $('#id_last_name').val(),
      email: $('#id_email').val()
    };
    
    var bill_toInfo = {
      first_name: $('#id_first_name').val(),
      last_name:  $('#id_last_name').val(),
      address_1:  $('#id_address_line_1').val(),
      city:       $('#id_city').val(),
      county:     $('#id_state').val(),
      country:    'US',
      postcode:   $('#id_postalcode').val(),
      phone:      $('#id_phone').val()
    };
    
    /*
    var CCData = {
      first_name: $('#card-holder-first-name').val(),
      last_name: $('#card-holder-last-name').val(),
      number: $('#card-number').val().replace(/\s+/g, ''), //Remove any spaces
      expiry_month: $('#card-exp-month').val(),
      expiry_year: $('#card-exp-year').val(),
      cvv: $('#card-cvc').val()
    };
    */
    
    //The 'dummy' payment gateway only seems to go through if I use the Moltin provided demo data.
    var CCData = {
      first_name:   'John',
      last_name:    'Doe',
      number:       '4242424242424242',
      expiry_month: '08',
      expiry_year:  '2020',
      cvv:          '123'
    };
    
    //If any custom error-handling functions need to be called in order to verify the
    //data before processing with Moltin, this is where it should be added.
    
    //Complete checkout and generate an order
    //https://docs.moltin.com/endpoints/checkout#convert-a-cart-into-an-order
    moltin.Cart.Complete({
      
      customer: customerInfo,
      shipping: '1494994904915378690', //Dummy shipping method I created for demo.
      gateway: 'dummy', //Moltin dummy gateway used for testing.
      bill_to: bill_toInfo,
      ship_to: 'bill_to',
      
    }, function(order) {
      //debugger;

      //Process payment
      //https://docs.moltin.com/endpoints/checkout#process-payment
      moltin.Checkout.Payment('purchase', order.id, {
        data: CCData
      }, function(payment) {
        //debugger;

        //Delete the cart so that the contents no longer show up in the DOM
        moltin.Cart.Delete(function() {
          //debugger;
          
          //On success, send the user to the thank you page.
          window.location.href = "/thankyou";

          //This would be a great place to send an email with an order summary.
          
        }, function(error) {
          debugger;
        });
        
      }, function(error) {
        debugger;
        alert("There was an error with your payment information! Please check the information you've provided. Contact customer support at support@thisstore.com if you need assistance.");
      });
      
    }, function(error) {
      debugger;
      
      alert("There was an error with your order! Please check the information you've provided. Contact customer support at support@thisstore.com if you need assistance.");
    });
    
  }, function(error) {
    debugger;

  });
}