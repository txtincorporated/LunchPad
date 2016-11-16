'use strict';

const communityController = {};

communityController.chooseCommunity = function() {
  $('#choose-community-div').show().siblings(':not(header)').hide();
};