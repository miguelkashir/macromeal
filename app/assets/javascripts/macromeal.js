$(document).ready(function() {
  $(".button-collapse").sideNav();
  $('select').material_select();
  $('.parallax').parallax();
});

function msg(text) {
  Materialize.toast(text, 2000)
}
