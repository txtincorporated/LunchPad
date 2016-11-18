'use strict';

const communityController = {};

$('#community-div #post-exp-button').on('click', e => {
  e.preventDefault();
  page('/experiences');
});

$('#back-button').on('click', e => {
  e.preventDefault();
  let storedId = localStorage.getItem('communityId');
  page('/community/' + storedId);
});

communityController.render = function(ctx, next) {
  communityController.fetchExp(ctx.params.id);
  next();
};

communityController.fetchExp = function(commId) {
  superagent
    .get('/lunch/community/' + commId)
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) throw err;
      $('#current-community').text(res.body[0].communityId.name);
      experienceView.populateHandlebars(res.body);
    });
};