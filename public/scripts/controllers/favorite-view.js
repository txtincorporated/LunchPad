'use strict';

const favoritesController = {};

favoritesController.render = function() {
  $('#favorites-user-div').show().siblings(':not(header)').hide();
};

favoritesController.favoriteUser = function () {
  $('#favorite-user-button').on('click', function (e)  {
    let favUser = $('#community-div > h1').text();
    e.preventDefault();
    superagent
      .put('/lunch/users/favorite')
      .set('authorization', localStorage.getItem('token'))
      .send({username: favUser})
      .end((err,res) => {
        if(err) {
          $('#favorite-message').append('error');
        }
        $('#favorite-message').text(`added ${res.body.username} as a favorite user`);
      });
  });
};

favoritesController.favoriteUser();