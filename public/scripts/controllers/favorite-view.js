'use strict';

const favoritesController = {};

favoritesController.render = function() {
  $('#favorites-user-div').show().siblings(':not(header)').hide();
};

favoritesController.favoriteUser = function () {
  $('#user-div > .favorite-button').on('click', function (e)  {
    let favUser = $('where-ever-the-username-is').text()
    e.preventDefault();
    superagent
      .put('/lunch/users/favorite')
      .set('authorization', localStorage.getItem('token'))
      .send({uername: favUser})
      .end((err) => {
        if(err, res) {
          $('#favorite-message').append('error');
        }
        $('#favorite-message').append(`added ${res.body.username} as a favorite user`);
      })
  }
}