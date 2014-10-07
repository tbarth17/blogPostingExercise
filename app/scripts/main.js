(function() {
'use strict';

$.fn.serializeObject = function(){
  return this.serializeArray().reduce(function(acum, i){
    acum[i.name] = i.value;
    return acum;
  }, {});
};

var BlogModel = Backbone.Model.extend({
  defaults: {
    title: '',
    body: ''
  },

  urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/posts'
});

var FormView = Backbone.View.extend({
  tagName: 'form',

  template: _.template($('#input-form').text()),

  events: {
    'submit': 'postBlog'
  },

  postBlog: function() {
    var blog = new BlogModel();
    event.preventDefault();
    var data = this.$el.serializeObject();
    blog.save(data);
  },

  initialize: function(options){
    options = options || {};
    this.$container = options.$container;
    this.$container.append(this.el);
  },

  render: function() {
    this.$el.html(this.template(this.model));
  }
});

$(document).ready(function() {
  var formView = new FormView({
    $container: $('.form-container'),
    model: BlogModel
  });
  formView.render();

});



})();
