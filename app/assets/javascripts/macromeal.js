$(document).ready(initialize);

function initialize() {
  $('.button-collapse').sideNav();
  $('.button-collapse').click(removeOverlay);
  $('select').material_select();
  $('.parallax').parallax();
  $('.collapsible').collapsible();
  $('.js-add-meal').click(addMeal);
}

function msg(text, time) {
  Materialize.toast(text, time)
}

function removeOverlay() {
  $('#sidenav-overlay').remove();
}

function addMeal() {
  var meal = '<li class="collection-item">';
  meal += '<h5>Comida #1</h5>';
  meal += '<table class="js-meal highlight centered">';
  meal += '<thead>';
  meal += '<tr>';
  meal += '<th data-field="name">Producto</th>';
  meal += '<th data-field="calories">Calorías</th>';
  meal += '<th data-field="protein">Proteínas</th>';
  meal += '<th data-field="fat">Grasas</th>';
  meal += '<th data-field="carbs">Carbohidratos</th>';
  meal += '<th data-field="price">Cantidad</th>';
  meal += '<th data-field="edit">Modificar</th>';
  meal += '<th data-field="delete">Eliminar</th>';
  meal += '<th data-field="price">Precio</th>';
  meal += '</tr>';
  meal += '</thead>';
  meal += '<tbody></tbody>';
  meal += '</table>';
  meal += '<br>';
  meal += '<a class="js-add-product waves-effect waves-light btn lime">';
  meal += '<i class="material-icons left">add</i>';
  meal += 'Añadir Producto</a>';
  meal += '</li>';

  $('.js-collection').append(meal);
  $('.js-add-product').click(addProduct);
}

function addProduct() {
  var product = '<tr>';
  product += '<td>Pechuga de pollo</td>';
  product += '<td>60</td>';
  product += '<td>20</td>';
  product += '<td>3</td>';
  product += '<td>0</td>';
  product += '<td>100 gr</td>';
  product += '<td>';
  product += '<a class="waves-effect waves-light btn"><i class="material-icons">add</i></a>';
  product += ' '; //buttons spacer
  product += '<a class="waves-effect waves-light btn"><i class="material-icons">remove</i></a>';
  product += '</td>';
  product += '<td>';
  product += '<a class="waves-effect waves-light btn red"><i class="material-icons">delete</i></a>';
  product += '</td>';
  product += '<td>0,5 €</td>';
  product += '</tr>';

  $('.js-meal tbody').append(product);
}
