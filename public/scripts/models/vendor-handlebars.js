'use strict';

const vendorView = {};

vendorView.toHtml = function(obj) {
  var template = Handlebars.compile($('#vendor-template').html());
  return template(obj);
};

vendorView.populateHandlebars = function(arr) {
  $('#experiences').empty();
  arr.forEach(expArr => {
    $('#experiences').append(vendorView.toHtml(expArr));
  });
};
