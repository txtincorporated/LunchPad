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
    .get('/lunch/user/' + userId)//userId s.b. for user who posted, not user requesting
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) throw err;
      experienceView.populateHandlebars(res.body);
    });
};