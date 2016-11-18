'use strict';
page('/', authController.render);

page('/choose-community', viewController.showChooseCommunity);

page('/community/:id', 
  communityController.render,
  viewController.showCommunity);

page('/user/:id', 
  communityController.render,
  viewController.showUser);

page('/vendors/:id',
  vendorController.render,
  vendorController.showVendors);

page('/experiences', viewController.showPostExperience);

page();
