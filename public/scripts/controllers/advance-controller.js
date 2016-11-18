'use strict';

const $advanceSort = $('#advance-sort');
const advanceController = {};

$advanceSort.on('click', function() {
  page('/advance');
});

advanceController.render = function() {
  advanceController.fetchExp();
};

advanceController.fetchExp = function() {
  superagent
    .get('/lunch/community/advance')
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) throw err;
      experienceView.populateHandlebars(res.body);
    });
};
