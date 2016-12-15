$(document).ready(initialize);

function initialize() {
  setActiveClassToCurrentNavLink();
}

function setActiveClassToCurrentNavLink() {
  $('.js-nav-link-orders').addClass('active');
}
