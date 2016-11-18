'use strict';

const vendorController = {};
const $vendorSort = $('#vendor-sort');

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

$vendorSort.on('click', function() {
  let currUser = $('#current-user').text();
  console.log('this is currUser text: ', currUser);
  superagent
    .get('/lunch/users/id/' + currUser)
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) console.log(err);
      console.log('inside vendor click handler', res.body);
      page('/vendors/' + res.body);
    });
});
