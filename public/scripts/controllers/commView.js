'use strict';

const viewController = {};

viewController.showCommunity = function() {
  $('#my-community-div').show().siblings(':not(header)').hide();
} ;