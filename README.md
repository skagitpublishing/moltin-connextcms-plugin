# moltin-connextcms-plugin

This plugin interfaces [ConnextCMS](http://connextcms.com) and [KeystoneJS](http://keystonejs.com) 
with the [Moltin eCommerce API service](https://www.moltin.com/) to create a Full Stack, JavaScript-native
eCommerce website.


## Demo
Try out the demo site at [ecommerce.connextcms.com](http://ecommerce.connextcms.com). Log into the back 
end with the default username/password of
`user@keystonejs.com/admin`. The server restores iteself from a backup every 24 hours, so don't
worry about messing it up. Go nuts!


### Clone the Demo
ConnextCMS is designed to run on a [Digital Ocean Droplet](https://m.do.co/c/8f47a23b91ce) VPS. 
A snapshot has been created that you can clone and spin up in a few minutes with all software and 
dependencies installed. To get your own copy, visit [ConnextCMS.com](http://connextcms.com) and 
[fill out this form](http://connextcms.com/page/clone-your-own). 

A 'vanilla' copy of ConnextCMS runs on port 80. A copy of the eCommerce demo runs on port 3002.
Both applications are managed with [pm2](http://pm2.keymetrics.io/). The Linux login/password
for the clone is `demouser/demouserpassword`.

Even if Digital Ocean is not your perfered devlopment/hosting environment, having a working copy
with properly compiled code is a great place to start. Feel free to copy the code from the clone
to your own environment.


## Documentation and Support
The easiest way to get up to speed on installing and using ConnextCMS is to watch the series of 
[instructional videos](http://connextcms.com/page/videos) that have been created. 
The most up-to-date documentation lives on the projects [GitHub Wiki page](https://github.com/skagitpublishing/ConnextCMS/wiki).
It is also strongly 
recommended that you familiarize yourself with the [KeystoneJS documentation](http://keystonejs.com/docs/). 

ConnextCMS is built using the Backbone.js and Require.js frameworks. 
[Developing Backbone.js Applications](https://addyosmani.com/backbone-fundamentals/) is a well 
written, free, open source book for learning about how to use these two frameworks.

If you get stuck and need help, you can reach out the [community support mailing list](https://groups.google.com/forum/#!forum/connextcms). 
If you're developing a site and need professional help, [Skagit Connext](http://skagitconnext.com/) is available to help you.


## Installation
This repository is based on the [ConnextCMS Plugin Template](https://github.com/skagitpublishing/plugin-template-connextcms). 
Investigate that repository for background on proper installation.
Below are the extra installation steps specific to this repository:

1. Clone this respository onto a system with a working version of ConnextCMS, and run the merge script
just like you would with the [ConnextCMS Plugin Template](https://github.com/skagitpublishing/plugin-template-connextcms).

2. Access the Keystone Admin UI and find the newly created Moltin model. Create a new model and add your Moltin API
key to it. Save the model.

3. Use Moltin's Forge dashboard to locate the product ID number of your products. For each product, create a page
in ConnextCMS and set its Redirect to something like this: `/product?productId=<your product Id>`


## Moltin/eCommerce Interface Specification

* Moltin API key is loaded into a KeystoneJS model. This key is retrieved by the front end when needed.

* The navigation menu is generated form the standard ConnextCMS Section/Page scheme. Each page references
a product and passes in the information with a redirect, including the product ID. 
Product information is retrieved from the Moltin API are used to populate the product page.

* Product pages use a Keystone template view to autogenerate content based on data pulled from the Moltin API.
  * View displays at path /product with an extension like: '?productId=12345' 
  * JavaScript in the /product template retrieves the product ID from the URL. 
    * If the product ID is blank or invalid, then an error message is displayed.
    * Otherwise the product information corresponding to that product ID is retrieved from the Moltin API and 
    the DOM is populated with content retrieved from Moltin.


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