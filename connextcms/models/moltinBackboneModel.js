


var ExampleModel = Backbone.Model.extend({

  idAttribute: "_id",  //Map the Model 'id' to the '_id' assigned by the server.

  //When initialized this.id is undefined. This url gets fixed in the initialize() function.
  //url: 'http://'+global.serverIp+':'+global.serverPort+'/api/post/'+this.id+'/update', 
  url: '',

  //Initialize is called upon the instantiation of this model. This function is executed once
  //per model retrieved from the server.
  initialize: function() {
    //This function is often used for debugging, so leave it here.
    //this.on('change', function() {
      //debugger;        
    //  this.save();
    //});
    //debugger;

    this.url = '/api/moltinplugin/'+this.id+'/update';
    
    this.fetch(); //Get the model data from the server.
    
    this.refreshView = false;
  },

  defaults: {
    '_id': '',
    'publicId': '',
  },

  //Override the default Backbone save() function with one that our API understands.
  save: function() {
    //debugger;

    var thisModel = this;
    
    //Update an existing model.
    if(this.id != "") {
    
      $.getJSON(this.url, this.attributes, function(data) {
        //Regardless of success or failure, the API returns the JSON data of the model that was just updated.
        //debugger;

        //If the refreshView flag is set, then refresh the Collection and then refresh the View.
        if(thisModel.refreshView) {
          thisModel.refreshView = false;
          global.exampleCollection.refreshView = true;
          global.exampleCollection.fetch();
        }

        log.push('moltinBackboneModel.js/save() executed.');

      }).error( function(err) {
        //This is the error handler.
        debugger;
        log.push('Error while trying moltinBackboneModel.js/save(). Most likely due to communication issue with the server.');
        //sendLog();
        console.error('Communication error with server while execute moltinBackboneModel.js/save()');
      });
      
    //Create a new model
    } else {
      $.post('/api/moltinplugin/create', this.attributes, function(data) {
        //debugger;
        thisModel.id = data.collection._id;
      }).error( function(err) {
        //This is the error handler.
        debugger;
        log.push('Error while trying moltinBackboneModel.js/save(). Most likely due to communication issue with the server.');
        //sendLog();
        console.error('Communication error with server while execute moltinBackboneModel.js/save()');
      });
    }

  },
  
  //This function retrieves the model data from the server.
  fetch: function() {
    //debugger;
    
    var thisModel = this;
    
    $.get('/api/moltinplugin/list', '', function(data) {
      debugger;
      
      if(data.collection[0] == undefined) {
        console.error('Could not retrieve Moltin API info from the model. Did you set the API key in Moltin model in the Keystone Admin UI? Error in moltin-connextcms-plugin/connextcms/models/moltinBckboneModel.js');
        return;
      }
      
      thisModel.id = data.collection[0]._id;
      thisModel.set('publicId', data.collection[0].publicId);
      thisModel.set('_id', data.collection[0]._id);
      thisModel.url = '/api/moltinplugin/'+thisModel.id+'/update';
      
    })
    .fail(function( jqxhr, textStatus, error ) {
      debugger;

      var err = textStatus + ", " + error;
      console.error(err);
    });
  }
});

