$(document).ready(initialize);
var mealsCounter = 0;
var productsCounter = 0;
var currentMeal;

function initialize() {
  $('.js-nav-links li').removeClass('active');
  $('.js-nav-link-order').addClass('active');
  $('.js-add-meal').click(addMeal);
  $('#modal-products').modal();
}

function addMeal() {
  var idMeal = mealsCounter++; //unique id for meal
  var meal = '<li class="collection-item" id="meal'+ idMeal +'">';
  meal += '<table class="js-meal highlight centered"><thead><tr>';
  meal += '<th data-field="name">Producto</th>';
  meal += '<th data-field="price">Cantidad</th>';
  meal += '<th data-field="edit">Modificar</th>';
  meal += '<th data-field="delete">Eliminar</th>';
  meal += '<th data-field="price">Precio</th>';
  meal += '</tr></thead><tbody></tbody></table><br>';
  meal += '<a class="js-add-products waves-effect waves-light btn lime" id="js-add-products-meal'+ idMeal +'">';
  meal += '<i class="material-icons left">add</i>Añadir Producto</a> ';
  meal += '<a class="js-del-meal waves-effect waves-light btn red">';
  meal += '<i class="material-icons">delete</i></a></li>';

  $('.js-collection').append(meal);
  $('.js-add-products').click(getProducts.bind(event));
  $('.js-del-meal').click(deleteMeal);
}

function getProducts(event) {
  idMeal = event.currentTarget.parentElement.id;
  $.ajax({
    type: 'GET',
    url: '/api/products',
    success: function(response) {
      showProducts(idMeal, response);
    }
  });
}

function showProducts(idMeal, response) {
  $('#modal-products').modal('open');
  currentMeal = idMeal;
  var products = '';
  for (var i = 0; i < response.length; i++) {
    products += '<div class="card horizontal hoverable">';
    products += '<div class="card-image"><img src="/assets/food/'+ response[i].img +'"></div>';
    products += '<div class="card-stacked">';
    products += '<div class="card-content">';
    products += '<h5>'+ response[i].name +'</h5>';
    products += '<p><strong>Calorías</strong>: '+ response[i].calories +'</p><br>';
    products += '<p><strong>Proteínas</strong>: '+ response[i].protein +'</p>';
    products += '<p><strong>Grasas</strong>: '+ response[i].fat +'</p>';
    products += '<p><strong>Carbohidratos</strong>: '+ response[i].carbs +'</p>';
    products += '</div>';
    products += '<div class="card-action">';
    products += '<a class="js-add-product waves-effect waves-light btn" id="' + response[i].id + '">';
    products += 'Añadir</a>';
    products += '</div></div></div><div><br>';
  }
  $('.js-products').empty();
  $('.js-products').append(products);
  $('.js-add-product').click(getProduct);
}

function getProduct(event) {
  var idProduct = event.currentTarget.id;

  $.ajax({
    type: 'GET',
    url: '/api/products/' + idProduct,
    success: addProduct
  });
}

function addProduct(response) {
  var idProduct = 'product'+ productsCounter++; //unique id for product

  var product = '<tr id="'+ idProduct +'">';
  product += '<td>'+ response.name +'</td>';
  product += '<td class="amount">100 gr</td>';
  product += '<td><a class="js-add-amount waves-effect waves-light btn">';
  product += '<i class="material-icons">add</i></a>';
  product += '<a class="js-substract-amount waves-effect waves-light btn grey disabled">';
  product += '<i class="material-icons">remove</i></a></td>';
  product += '<td><a class="js-del-product waves-effect waves-light btn red">';
  product += '<i class="material-icons">delete</i></a></td>';
  product += '<td>'+ response.price +' €</td>';
  product += '</tr>';

  $('#'+ currentMeal +' table tbody').append(product);
  msg('Añadido: '+ response.name, 1000);
  $('.js-add-amount').click(addAmount);
  $('.js-substract-amount').click(substractAmount);
  $('.js-del-product').click(deleteProduct);
}

function deleteMeal(event) {
  var idMeal = event.currentTarget.parentElement.id;
  $('#'+ idMeal).remove();
}

function deleteProduct(event) {
  var idProduct = event.currentTarget.parentElement.parentElement.id;
  console.log(idProduct);
  $('#'+ idProduct).remove();
}

function addAmount(event) {
  var idProduct = event.currentTarget.parentElement.parentElement.id;
  console.log(idProduct);
  var currentAmount = parseInt(($('#'+ idProduct +' .amount').text()).split(' ')[0]);
  currentAmount += 100;
  $('#'+ idProduct +' .amount').text(currentAmount +' gr');
  if(currentAmount > 100) {
    $('#'+ idProduct +' .js-substract-amount').removeClass('disabled');
    $('#'+ idProduct +' .js-substract-amount').removeClass('grey');
    $('#'+ idProduct +' .js-substract-amount').addClass('red accent-1');
  }
}

function substractAmount(event) {
  var idProduct = event.currentTarget.parentElement.parentElement.id;
  var currentAmount = parseInt($('#'+ idProduct +' .amount').text().split(' ')[0]);
  currentAmount -= 100;
  $('#'+ idProduct +' .amount').text(currentAmount +' gr');
  if(currentAmount === 100) {
    $('#'+ idProduct +' .js-substract-amount').addClass('disabled');
    $('#'+ idProduct +' .js-substract-amount').addClass('grey');
  }
}
