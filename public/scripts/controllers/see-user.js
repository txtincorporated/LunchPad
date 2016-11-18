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
  $('#user-view-user').empty();
  $('#favorite-message').empty();
  $('#user-view-user').text(ctx.params.username);
  $('#experience-interface').hide();
  $('#user-interface').show();
  next();
};

userController.hideUser = function(ctx,next) {
  $('#user-view-user').empty();
  $('#favorite-message').empty();
  $('#user-interface').hide();
  $('#experience-interface').show();
  next();
};
