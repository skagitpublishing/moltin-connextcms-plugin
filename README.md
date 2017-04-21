# moltin-connextcms-plugin

This plugin interfaces [ConnextCMS](http://connextcms.com) and [KeystoneJS](http://keystonejs.com) 
with the [Moltin eCommerce API service](https://www.moltin.com/) to create a Full Stack, JavaScript-native
eCommerce website.


## Demo
Try out the demo site at [ecommerce.connextcms.com](ecommerce.connextcms.com). Log into the back end with default user/pass of
**user@keystonejs.com/admin**. The server restored iteself from a backup every 24 hours, so don't
worry about messing it up.


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


## License
(The MIT License)

Copyright (c) 2016 [Skagit Connext](http://skagitconnext.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Attribution
This eCommerce plugin/demo makes use of the following open source repositories:
* [ConnextCMS](https://github.com/skagitpublishing/ConnextCMS)
* [ConnextCMS Plugin Template](https://github.com/skagitpublishing/plugin-template-connextcms)
* [KeystoneJS](https://github.com/keystonejs/keystone)
* [Boostrap](http://getbootstrap.com)
* [Bootstrap template by W3 Layouts](https://p.w3layouts.com/demos/mattress/web/index.html)
* [Awesome Checkout snippet](http://bootsnipp.com/snippets/Oe2vO)