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
      if (err) throw err;
      let aggVendors = [].concat.apply([], res.body);
      aggVendors.sort(function(a, b){
        return b.worthIt - a.worthIt;
      });
      vendorView.populateHandlebars(aggVendors);
    });
};

$vendorSort.on('click', function() {
  page('/vendors');
});
