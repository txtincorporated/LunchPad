'use strict';

$('#experiences>.button').on('click', () => {
  page('/experiences');
});

userController.render = function(ctx, next) {
  userController.fetchExp(ctx.params.id);
  next();
};

userController.fetchExp = function(userId) {
  superagent
    .get('/lunch/user/' + userId)
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) throw err;
      experienceView.populateHandlebars(res.body);
    });
};