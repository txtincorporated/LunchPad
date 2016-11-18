'use strict';

const communityController = {};

$('#community-div #post-exp-button').on('click', e => {
  e.preventDefault();
  page('/experiences');
});

$('#community-div .edit-exp-button').on('click', e => {
  e.preventDefault();
  page('/experiences');
});

$('#back-button').on('click', e => {
  e.preventDefault();
  let storedId = localStorage.getItem('communityId');
  page('/community/' + storedId);
});

$('#recent-sort').on('click', e => {
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
      res.body.forEach(ven => {
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
      $('#current-community').text(res.body[0].communityId.name);
      experienceView.populateHandlebars(res.body);
    });
};