'use strict';

const viewController = {};

viewController.showCommunity = function() {
  $('#community-div').show().siblings(':not(header)').hide();
};

viewController.showUser = function() {
  $('#user-div').show().siblings(':not(header)').hide();
};

viewController.showChooseCommunity = function() {
  $('#choose-community-div').show().siblings(':not(header)').hide();
};

viewController.showPostExperience = function() {
  $('#post-experience-div').show().siblings(':not(header)').hide();
  $('#post-experience-div>button:contains("Submit")').show().siblings('#post-experience-div>button').hide();
};

viewController.showFavorites = function() {
  $('#favorites-user-div').show().siblings(':not(header)').hide();
};

viewController.showPutExperience = function() {
  $('#post-experience-div').show().siblings(':not(header)').hide();
  $('#post-experience-div>button:contains("Update")').show().siblings('#post-experience-div>button').hide();
};

