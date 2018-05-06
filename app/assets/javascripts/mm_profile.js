$(document).ready(initialize);

function initialize() {
  setActiveClassToCurrentNavLink();
}

function setActiveClassToCurrentNavLink() {
  $('.js-nav-link-profile').addClass('active');
}
