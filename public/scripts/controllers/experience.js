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
      console.log(res);
    });
});