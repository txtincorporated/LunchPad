'use strict';

const vendorView = {};

vendorView.toHtml = function(obj) {
  var template = Handlebars.compile($('#vendor-template').html());
  return template(obj);
};

vendorView.populateHandlebars = function(arr) {
  $('#experiences').empty();
  arr.forEach(exp => {
    $('#experiences').append(vendorView.toHtml(exp));
  });
};
