'use strict';

const authController = {};

authController.showSignup = function() {
  $('#signup-signin-div').show().siblings(':not(header)').hide();
} ;

