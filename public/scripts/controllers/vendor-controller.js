'use strict';

const vendorController = {};

vendorController.render = function(ctx, next) {
  vendorController.fetchExp(ctx.params.id);
  next();
};

vendorController.fetchExp = function(commId) {
  superagent
    .get('/lunch/vendors')
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) throw err;
      vendorView.populateHandlebars(res.body);
    });
};