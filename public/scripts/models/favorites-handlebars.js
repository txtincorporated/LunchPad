'use strict';

const favoritesView = {};

favoritesView.toHtml = function(obj) {
  var template = Handlebars.compile($('#favorites-user-template').html());
  console.log('what is toHtml compiling', obj);
  return template(obj);
};

favoritesView.populateHandlebars = function(arr) {
  console.log('what is the array coming in', arr);
  $('#favorites-user-list').empty();
  arr.forEach(favUser => {
    console.log('handlebars needs an object', favUser);
    console.log(typeof favoritesView.toHtml(favUser));
    $('#favorites-user-list').append(favoritesView.toHtml(favUser));
  });
};
