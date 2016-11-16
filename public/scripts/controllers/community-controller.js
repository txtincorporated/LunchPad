'use strict';

const communityController = {};

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