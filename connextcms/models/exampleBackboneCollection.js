
//Create an empty Collection to hold all the posts.
var ExampleCollection = Backbone.Collection.extend({ //Collection Class
  
  model: ExampleModel,
  //url: 'http://'+global.serverIp+':'+global.serverPort+'/api/pagesection/list',
  url: '',

  //parse is called when data is returned from the server after a fetch() call.
  //Parse allows me to massage non-standard data before it is returned to the collection.
  parse: function(response) {
    //debugger;

    if(response.collection.length == 0) {
      log.push('Empty data returned by server when trying to retrieve ExampleModel collection. Most likely due to a new DB.');
      return [global.exampleModel];
    } else {
      return response.collection;
    }
  },

  //If true, the View will be re-render()'d when the collection is refreshed/reset.
  refreshView: false,

  initialize: function() {
    //debugger;
    //This function is often used for debugging, so leave it here.
    //this.on('change', function(model) {
    //  debugger;
    //});

    this.url = '/api/exampleplugin/list',

    this.on('add', function() {
      debugger;
    });

    this.on('reset', function() {
      //debugger;

      if(this.refreshView) {
        this.refreshView = false;
        global.pluginView.exampleView1.render();
      }

      //Assumption: this funciton is only called when opening the image gallery. Therefore we need to call it again and
      //finish populating the image library.
      log.push('Finished retrieving Example Collection data from server.');

    });
  }
});


