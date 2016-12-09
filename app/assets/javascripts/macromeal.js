$(document).ready(initialize);

function initialize() {
  $('.button-collapse').sideNav();
  $('.button-collapse').click(removeOverlay);
  $('select').material_select();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $('.definition').click(calculate_objective);
}

function msg(text) {
  Materialize.toast(text, 2000)
}

function removeOverlay() {
  $('#sidenav-overlay').remove();
}
