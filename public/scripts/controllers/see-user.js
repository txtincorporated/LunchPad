'use strict';

const userController = {};

userController.render = function(ctx, next) {
  userController.fetchExp(ctx.params.username);
  next();
};

userController.fetchExp = function(username) {
  superagent
    .get('/lunch/experiences/' + username)
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) throw err;
      experienceView.populateHandlebars(res.body);
    });
};

userController.displayUser = function(ctx, next) {
  $('#community-div > h1').text(ctx.params.username);
  next();
}