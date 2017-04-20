# moltin-connextcms-plugin

This plugin attempts to interface ConnextCMs with the Moltin ecommerce API.

## Moltin/eCommerce Interface Specification

* Moltin API key needs to be added to the Site Settings area.

* Product categories retrieved from Moltin are used to generate the navigation menu.

* Product pages use a Keystone template view to autogenerate content based on data pulled from the Moltin API.
  * View displays at path /product with an extension like: '?productId=12345' 
  * JavaScript in the /product template retrieves the product ID from the URL. 
    * If the product ID is blank or invalid, then an error message is displayed.
    * Otherwise the product information corresponding to that product ID is retrieved from the Moltin API and the DOM is populated with content retrieved from Moltin.

## Installation
This repository is based on the ConnextCMS Plugin Template. Investigate that repository for background on proper installation.
Below are the extra installation steps specific to this repository:

1. Clone this respository onto a system with a working version of ConnextCMS, and run the merge script
just like the ConnextCMS Plugin Template.

2. Access the Keystone Admin UI and find the newly created Moltin model. Create a new model and add your Moltin API
key to it. Save the model.

3. Use Moltin's Forge dashboard to locate the product ID number of your products. For each product, create a page
in ConnextCMS and set its Redirect to something like this: `/product?productId=<your product Id>`


## Attribution
This eCommerce plugin/demo makes use of the following open source repositories:
* KeystoneJS
* ConnextCMS
* ConnextCMS Plugin Template
* [Boostrap](http://getbootstrap.com)
* [Bootstrap template by W3 Layouts](https://p.w3layouts.com/demos/mattress/web/index.html)
* [Awesome Checkout snippet](http://bootsnipp.com/snippets/Oe2vO)