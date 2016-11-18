'use strict';
page('/', authController.render);

page('/choose-community', viewController.showChooseCommunity);

page('/community/:id', 
  communityController.render,
  viewController.showCommunity);

page('/user/:username', 
  userController.render,
  userController.displayUser,
  viewController.showCommunity);

page('/vendors',
  vendorController.render);

page('/experiences', viewController.showPostExperience);

page();
