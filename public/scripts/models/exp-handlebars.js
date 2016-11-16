'use strict';

const experienceView = {};

experienceView.toHtml = function(obj) {
  var template = Handlebars.compile($('#experience-template').html());
  return template(obj);
};

experienceView.populateHandlebars = function(arr) {
  $('#experiences').empty();
  arr.forEach(exp => {
    $('#experiences').append(experienceView.toHtml(exp));
  });
};
