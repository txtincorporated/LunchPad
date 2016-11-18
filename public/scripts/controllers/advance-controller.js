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
  console.log('about to make a call from fetchExp');
  superagent
    .get('/lunch/community/advance')
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      console.log('this is the advance controller res body', res.body);
      if (err) throw err;
      experienceView.populateHandlebars(res.body);
    });
};
