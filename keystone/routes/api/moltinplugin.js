var async = require('async'),
	keystone = require('keystone');


var MoltinModel = keystone.list('MoltinModel');

/**
 * List MoltinModel
 */
exports.list = function(req, res) {
	MoltinModel.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			collection: items
		});
		
	});
}

/**
 * Create MoltinModel
 */
exports.create = function(req, res) {
	//debugger;
  
  //This is a check to make sure the user is a ConnexstCMS Admin or Superuser
  var admins = keystone.get('admins');
  var superusers = keystone.get('superusers');
  var userId = req.user.get('id');
  if((admins.indexOf(userId) == -1) && (superusers.indexOf(userId) == -1)) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin');
  }
  
	var item = new MoltinModel.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			collection: item
		});
		
	});
}

/**
 * Update MoltinModel by ID
 */
exports.update = function(req, res) {
  
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  
  //This is a check to make sure the user is a ConnexstCMS Admin or Superuser
  var admins = keystone.get('admins');
  var superusers = keystone.get('superusers');
  var userId = req.user.get('id');
  if((admins.indexOf(userId) == -1) && (superusers.indexOf(userId) == -1)) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin');
  }
  
	MoltinModel.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				collection: item
			});
			
		});
		
	});
}

/**
 * Delete MoltinModel by ID
 */
exports.remove = function(req, res) {
	
  //Ensure the user has a valid CSRF token
	//if (!security.csrf.validate(req)) {
	//	return res.apiError(403, 'invalid csrf');
	//}
  

  //This is a check to make sure the user is a ConnexstCMS Admin or Superuser
  var admins = keystone.get('admins');
  var superusers = keystone.get('superusers');
  var userId = req.user.get('id');
  if((admins.indexOf(userId) == -1) && (superusers.indexOf(userId) == -1)) {
    return res.apiError(403, 'Not allowed to access this API. Not ConnextCMS Admin');
  }
  
  MoltinModel.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}

