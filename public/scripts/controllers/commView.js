'use strict';

const viewController = {};

viewController.showCommunity = function() {
  $('#community-div').show().siblings(':not(header)').hide();
} ;