//debugger;




//'use strict'; //Causes error trying to import ExampleView1 object into ConnextCMS.

var MoltinTemplate1;

var MoltinView1 = Backbone.View.extend({

  tagName:  'div',

  el: '', 

  //template: _.template(ExampleTemplate1),

  // The DOM events specific to an item.
  events: {
    'click .saveApiKey': 'saveKey'
  },

  initialize: function () {
    //debugger;
    
    //Load the plugin metdata as a local variables.
    this.pluginData = this.options.pluginData;
    
    //Load a handle to the plugin constructs as a local variable.
    this.pluginHandle = this.options.pluginHandle;
    
    //Declare the view Constructor name. Needed to distinguish between views and to identify the primary view.
    this.viewName = "MoltinView1";
    
    var thisView = this; //Maitain scope inside the AJAX handler.
    
    //Get the template associated with this view.
    MoltinTemplate1 = '/'+this.pluginData.backboneTemplateFiles[0];
    var templatePath = '/plugins/'+this.pluginData.pluginDirName+MoltinTemplate1;
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
    
    //Assign the model to the view.
    this.model = this.pluginHandle.models[0];
    
    this.$el.find('#inputApiKey').val(this.model.get('publicId'));
    
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
  
  //This function is called when the user clicks the Save button.
  saveKey: function() {
    debugger;
    
    this.model.set('publicId', this.$el.find('#inputApiKey').val());
    
    this.model.save();
  },
  


});





