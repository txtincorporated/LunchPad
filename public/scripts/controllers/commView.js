'use strict';

const viewController = {};

viewController.showCommunity = function() {
  $('#community-div').show().siblings(':not(header)').hide();
} ;

viewController.showUser = function() {
  $('#user-div').show().siblings(':not(header)').hide();
} ;