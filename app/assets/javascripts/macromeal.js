$(document).ready(initialize);
// $(document).on('turbolinks:render', initialize);

function initialize() {
  $('.button-collapse').sideNav();
  $('select').material_select();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $('.definition').click(calculate_objective);
}

function msg(text) {
  Materialize.toast(text, 2000)
}

function calculate_objective(event) {
  console.log(event.currentTarget.className.split(' ')[0]);
}
