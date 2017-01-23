//debugger;


//Get a local copy of the JSON settings for this plugin.
//Loop through all the loaded plugins until we find the one matches this plugin.
//Copy the JSON data for this plugin into local variable pluginData.
for(var i=0; i < global.pluginView.pluginData.length; i++) {
  var pluginData = global.pluginView.pluginData[i];
  if(pluginData.pluginDirName == 'plugin-template-connextcms') {
    break;
  }
}

//'use strict'; //Causes error trying to import ExampleView1 object into ConnextCMS.

var ExampleTemplate1 = '/'+pluginData.backboneTemplates[0];

var ExampleView1 = Backbone.View.extend({

  tagName:  'div',

  el: '', 

  //template: _.template(ExampleTemplate1),

  // The DOM events specific to an item.
  events: {

  },

  initialize: function () {
    //debugger;
    
    this.pluginData = this.options.pluginData;
    
    var thisView = this; //Maitain scope inside the AJAX handler.
    
    //Get the template associated with this view.
    var templatePath = '/plugins/'+this.pluginData.pluginDirName+ExampleTemplate1;
    $.get(templatePath, '', function(template) {
      //debugger;
      
      //Copy the contents of the template file into this views template object.
      thisView.template = _.template(template);

    })
    .fail(function( jqxhr, error, exception ) {
      debugger;
    });
    
  },

  render: function () {
    //debugger;
    
    //Hide all views.
    global.leftMenuView.hideAll();
    
    //Render this view
    this.$el.html(this.template);    
    this.$el.show();
    
    //Visually update the left menu to inidicate that this plugin view was selected.
    this.updateLeftMenuView();
    
    //Fill in the View with any model data.
    this.loadData();
    
    //Hide the delete button on the scaffolding template.
    this.$el.find('#pluginScaffold').find('.delBtn').hide();
    
    return this;
  },

  
  //This function is called by render(). It's responsible for maintinain visual consistency in the
  //left menu when the menu item for this plugin is selected.
  updateLeftMenuView: function() {
    //debugger;
    //Remove the 'active' class from the menu item, unless it's a treeview menu item.
    //(treeview) menu items will remove their active class in their click event.
    if( !global.leftMenuView.$el.find('.sidebar-menu').find('.active').hasClass('treeview') )
      global.leftMenuView.$el.find('.sidebar-menu').find('.active').removeClass('active');
    else
      global.leftMenuView.closeCollapsableLeftMenu();

    //Switch the 'active' class to the selected menu item
    $('#example1-link').addClass('active');

    $('#app-location').text('Plugin Example View');
  },
  
  //This function is called by render(). It populates the View with Model data retrieved from the Collection.
  loadData: function() {
    //debugger;
    
    var scaffoldElem = this.$el.find('#pluginScaffold');
    
    //Loop through all the Models in the Collection.
    for(var i=0; i < global.exampleCollection.models.length; i++) {
      var thisModel = global.exampleCollection.models[i];
      
      //Clone the scaffolding element      
      var tmpElem = scaffoldElem.clone();
      tmpElem.attr('id', 'model'+i);
      
      //Populate the cloned element with information from the model
      tmpElem.find('.control-label').text('String '+i);
      tmpElem.find('.strInput').val(thisModel.get('entry'));
      tmpElem.find('.addBtn').text('Update');
      
      //Add click functions tot he cloned element.
      tmpElem.find('.addBtn').click([i], this.updateModel);
      tmpElem.find('.delBtn').click([i], this.delModel);
      
      //Add the cloned element to the DOM.
      this.$el.find('.form-horizontal').prepend(tmpElem);
    }
    
    //Add a click event to the scaffolding element.
    scaffoldElem.find('.addBtn').click(this.addStr);
  },
  
  //This function is called whenever the user clicks on the 'Update' button next to a model listing.
  updateModel: function(event) {
    //debugger;
    
    //Get a handle on the selected model.
    var modelIndex = event.data[0];
    var thisModel = global.exampleCollection.models[modelIndex];
    var thisModelId = thisModel.get('_id');
    
    //Get a handle on this view.
    var thisView = global.pluginView.exampleView1;
    
    //Retrieve the updated string.
    var newStr = thisView.$el.find('#model'+modelIndex).find('.strInput').val();
    thisModel.set('entry', newStr);
    
    //Persist the updated model to the server.
    thisModel.refreshView = true;
    thisModel.save();
    
  },
  
  //This function is called whenever the user clicks ont he 'Delete' button next to a model listing.
  delModel: function(event) {
    //debugger;
    
    //Get a handle on the selected model.
    var modelIndex = event.data[0];
    var thisModel = global.exampleCollection.models[modelIndex];
    var thisModelId = thisModel.get('_id');
    
    //Delete the model on the server.
    $.get('/api/exampleplugin/'+thisModelId+'/remove', '', function(data) {
      //debugger;
      
      //Error Handling.
      if(!data.success) {
        console.error('Error deleting example plugin model '+thisModelId);
        return;
      }
      
      //Refresh the Collection and View.
      global.exampleCollection.refreshView = true;
      global.exampleCollection.fetch();
      
    })
    .fail(function( jqxhr, textStatus, error ) {
      debugger;
      
      try {
        if(jqxhr.responseJSON.detail == "invalid csrf") {
          global.modalView.errorModal('Update failed due to a bad CSRF token. Please log out and back in to refresh your CSRF token.');
          return;
        } else {
          global.modalView.errorModal("Request failed because of: "+error+'. Error Message: '+jqxhr.responseText);
          console.log( "Request Failed: " + error );
          console.error('Error message: '+jqxhr.responseText);
        }
      } catch(err) {
        console.error('Error trying to retrieve JSON data from server response.');
      } 
    });
  },
  
  //This function is called when the user clicks the 'Add' button next to the scaffolding element.
  addStr: function() {
    //debugger;
    
    //Get a handle on this view.
    var thisView = global.pluginView.exampleView1;
    
    //Get a handle on the scaffold element
    var scaffoldElem = thisView.$el.find('#pluginScaffold');
    
    //Create a new model.
    var obj = new Object();
    obj.entry = scaffoldElem.find('.strInput').val();
    
    //Submit the new model to the server.
    $.post('/api/exampleplugin/create', obj, function(data) {
      //debugger;
      
      global.exampleCollection.refreshView = true;
      global.exampleCollection.fetch();
    })
    .fail(function( jqxhr, textStatus, error ) {
      debugger;
      
      try {
        if(jqxhr.responseJSON.detail == "invalid csrf") {
          global.modalView.errorModal('Update failed due to a bad CSRF token. Please log out and back in to refresh your CSRF token.');
          return;
        } else {
          global.modalView.errorModal("Request failed because of: "+error+'. Error Message: '+jqxhr.responseText);
          console.log( "Request Failed: " + error );
          console.error('Error message: '+jqxhr.responseText);
        }
      } catch(err) {
        console.error('Error trying to retrieve JSON data from server response.');
      } 
    });
  }


});





