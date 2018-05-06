$(document).ready(initialize);

function initialize() {
  removeActiveClassFromNavLinks();
  $('.button-collapse').sideNav();
  $('.button-collapse').click(removeOverlay);
  $('select').material_select();
  $('.collapsible').collapsible();
}

function msg(text, time) {
  Materialize.toast(text, time)
}

function removeOverlay() {
  $('#sidenav-overlay').remove();
}

function removeActiveClassFromNavLinks() {
  $('.js-nav-links li').removeClass('active');
}
