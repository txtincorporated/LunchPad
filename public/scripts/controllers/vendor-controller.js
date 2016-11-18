'use strict';

const vendorController = {};
// const $vendorSort = $('#vendor-sort');

vendorController.render = function(ctx, next) {
  vendorController.fetchExp(ctx.params.id);
  next();
};

vendorController.fetchExp = function(commId) {
  superagent
    .get('/lunch/vendors/' + commId)
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) throw err;
      vendorView.populateHandlebars(res.body);
    });
};

// $vendorSort.on('click', function() {
//   superagent
    
//   page('/vendors/' + ---);
// });
