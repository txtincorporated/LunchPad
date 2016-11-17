'use strict';
page('/', authController.render);

page('/choose-community', chooseCommunity.render);

page('/community/:id', 
  communityController.render,
  viewController.showCommunity);

page('/vendors',
  vendorController.render,
  viewController.showCommunity);

page();
