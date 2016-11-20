'use strict';

const favoritesView = {};

favoritesView.toHtml = function(obj) {
  var template = Handlebars.compile($('#favorites-user-template').html());
  return template(obj);
};

favoritesView.populateHandlebars = function(arr) {
  $('#favorites-user-list').empty();
  arr.forEach(favUser => {
    $('#favorites-user-list').append(favoritesView.toHtml(favUser));
  });
};
