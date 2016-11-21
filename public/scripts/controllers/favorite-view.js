'use strict';

const favoritesController = {};

favoritesController.render = function() {
  $('#favorites-user-div').show().siblings(':not(header)').hide();
};

favoritesController.favoriteUser = function () {
  $('#favorite-user-button').on('click', function (e)  {
    let favUser = $('#user-view-user').text();
    e.preventDefault();
    superagent
      .put('/lunch/users/favorite')
      .set('authorization', localStorage.getItem('token'))
      .send({username: favUser})
      .end((err, res) => { //eslint-disable-line
        if(err) {
          $('#favorite-message').append('error');
        } else {
          $('#favorite-message').text(`added ${favUser} as a favorite user`);
        }
      });
  });
};

favoritesController.render = function(ctx, next) {
  favoritesController.fetchFavUsers();
  next();
};

favoritesController.fetchFavUsers = function () {
  superagent
    .get('/lunch/users/favorite')
    .set('authorization', localStorage.getItem('token'))
    .end((err, res) => {
      if (err) {throw err;}
      else{favoritesView.populateHandlebars(res.body);}
    });
};
$('#current-user').on('click', function() {
  page('/favorites');
});

favoritesController.favoriteUser();