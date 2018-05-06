$(document).ready(initialize);

function initialize() {
  $('.parallax').parallax();
  setActiveClassToCurrentNavLink();
}

function setActiveClassToCurrentNavLink() {
  $('.js-nav-link-home').addClass('active');
}
