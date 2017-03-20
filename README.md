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
