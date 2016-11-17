'use strict';

const $experienceForm = $('#experience-form');

$experienceForm.on('submit', e => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const input = {};
  input.name = $('#vendor-name').val();
  input.time = $('#time').val();
  input.howFast = $('input[name="howFast"]:checked').val();
  if ($('#calledAhead').is(':checked')) {
    input.calledAhead = true;
  } else {
    input.calledAhead = false;
  }
  input.cost = $('input[name="cost"]:checked').val();
  input.worthIt = $('input[name="worthIt"]:checked').val();
  input.advice = $('#advice').val();

  superagent
    .post('/lunch/experiences')
    .set({'Authorization': token})
    .send(input)
    .end((err, res) => {
      if(err) console.log(err);
      else{
        page(`/community/${res.body.communityId}`);
      }
    });
});

$('#experiences').on('click', '#username', function() {
  const username = $(this).attr('data-username'); 
  console.log(username);
  superagent
    .get('/lunch/experiences/')
    .set('authorization', localStorage.getItem('token'))
    .query({username})
    .end((err, res) => {
      if (err) throw err;
      console.log(res.body);
      $('#community-div > h1').text(res.body[0].userId.username);
      experienceView.populateHandlebars(res.body);
    });
});