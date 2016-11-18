'use strict';

const vendorController = {};
const $vendorSort = $('#vendor-sort');

vendorController.render = function() {
  vendorController.fetchExp();
};

vendorController.fetchExp = function() {
  superagent
    .get('/lunch/vendors')
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      console.log(res.body);
      if (err) throw err;
      vendorView.populateHandlebars(res.body);
    });
};

$vendorSort.on('click', function() {
  page('/vendors');
});
