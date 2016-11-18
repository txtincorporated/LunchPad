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
        if (ven.howFast < 2.5) ven.howFast = 'Slow';
        else if (ven.howFast < 4) ven.howFast = 'Average';
        else ven.howFast = 'Fast!';
        if (ven.cost < 1.75) ven.cost = 'Cheap';
        else if (ven.cost < 2.25) ven.cost = 'Average';
        else ven.cost = 'Expensive';
        if (ven.worthIt < 2.5) ven.worthIt = 'Meh';
        else if (ven.worthIt < 4) ven.worthIt = 'Yes';
        else ven.worthIt = 'Totally!';
      });
      vendorView.populateHandlebars(aggVendors);
    });
};

$vendorSort.on('click', function() {
  page('/vendors');
});
