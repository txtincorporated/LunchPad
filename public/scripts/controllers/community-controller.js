'use strict';

const communityController = {};

$('#community-div .button').on('click', e => {
  e.preventDefault();
  page('/experiences');
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
      experienceView.populateHandlebars(res.body);
    });
};