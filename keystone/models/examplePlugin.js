var keystone = require('keystone');

/**
 * ExamplePluginModel Model
 * ==================
 */

var ExamplePluginModel = new keystone.List('ExamplePluginModel');

ExamplePluginModel.add({
	entry: { type: String},
});

ExamplePluginModel.register();
