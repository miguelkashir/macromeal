$(document).on('ready', initialize);
$(document).on('turbolinks:load', initialize);

function initialize() {
  $(".button-collapse").sideNav();
  $('select').material_select();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
}

function msg(text) {
  Materialize.toast(text, 2000)
}
