var keystone = require('keystone');

/**
 * MoltinModel Model
 * ==================
 */

var MoltinModel = new keystone.List('MoltinModel');

MoltinModel.add({
	publicId: { type: String},
});

MoltinModel.register();
