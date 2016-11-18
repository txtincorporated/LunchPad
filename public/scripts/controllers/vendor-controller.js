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
      aggVendors.forEach(ven => {
        ven.howFast = ven.howFast.toFixed(1);
        ven.cost = ven.cost.toFixed(1);
        ven.worthIt = ven.worthIt.toFixed(1);
      });
      // Math.floor(aggVendors[1].howFast);
      vendorView.populateHandlebars(aggVendors);
    });
};

$vendorSort.on('click', function() {
  page('/vendors');
});
