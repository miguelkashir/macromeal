$(document).ready(initialize);
var mealsCounter = 0;
var productsCounter = 0;
var currentMeal;

//init loads
function initialize() {
  $('.js-nav-links li').removeClass('active');
  $('.js-nav-link-order').addClass('active');
  $('.js-add-meal').click(addMeal);
  $('#modal-products').modal();
}

// js-add-meal callback, adds a meal block
function addMeal() {
  var idMeal = mealsCounter++; //unique id for meal

  var meal = '<li class="collection-item" id="meal'+ idMeal +'">';
  meal += '<table class="js-meal highlight centered"><thead><tr>';
  meal += '<th data-field="name">Producto</th>';
  meal += '<th data-field="calories">Calorías</th>';
  meal += '<th data-field="protein">Proteínas</th>';
  meal += '<th data-field="fat">Grasas</th>';
  meal += '<th data-field="carbs">Carbohidratos</th>';
  meal += '<th data-field="price">Cantidad</th>';
  meal += '<th data-field="edit">Modificar</th>';
  meal += '<th data-field="delete">Eliminar</th>';
  meal += '<th data-field="price">Precio</th>';
  meal += '</tr></thead><tbody></tbody></table><br>';

  //add product to meal
  meal += '<a class="js-add-products waves-effect waves-light btn lime" id="js-add-products-meal'+ idMeal +'">';
  meal += '<i class="material-icons left">add</i>Añadir Producto</a> ';

  //delete meal
  meal += '<a class="js-del-meal waves-effect waves-light btn red">';
  meal += '<i class="material-icons">delete</i></a></li>';

  $('.js-collection').append(meal);
  $('.js-add-products').click(loadProducts.bind(event));
  $('.js-del-meal').click(deleteMeal);
}

//js-add-products callback, AJAX query loading products
function loadProducts(event) {
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
    products += '<a class="collection-item">' + response[i].name + '<br>';
    products += '<a class="js-add-product waves-effect waves-light btn" id="' + response[i].id + '">';
    products += '<i class="material-icons">add</i>Añadir</a></a>';
  }
  $('.js-products').empty();
  $('.js-products').append(products);
  $('.js-add-product').click(addProduct);
}

//js-add-product callback, adds product to meal
function addProduct(event) {
  var idProduct = event.currentTarget.id;

  $.ajax({
    type: 'GET',
    url: '/api/products/' + idProduct,
    success: function(response) {
      var idProduct = 'product'+ productsCounter++; //unique id for product

      var product = '<tr id="'+ idProduct +'">';
      product += '<td>'+ response.name +'</td>';
      product += '<td>'+ response.calories +'</td>';
      product += '<td>'+ response.protein +'</td>';
      product += '<td>'+ response.fat +'</td>';
      product += '<td>'+ response.carbs +'</td>';

      if (response.category !== 'bebida') {
        product += '<td>100 gr</td>';
      }
      else {
        product += '<td>1</td>';
      }

      product += '<td>';
      product += '<a class="waves-effect waves-light btn"><i class="material-icons">add</i></a>';
      product += ' '; //buttons spacer
      product += '<a class="waves-effect waves-light btn grey disabled"><i class="material-icons">remove</i></a>';
      product += '</td>';
      product += '<td>';
      product += '<a class="js-del-product waves-effect waves-light btn red"><i class="material-icons">delete</i></a>';
      $('.js-del-product').click(deleteProduct);
      product += '</td>';
      product += '<td>'+ response.price +' €</td>';
      product += '</tr>';

      msg('Añadido: '+ response.name, 1000);
      $('#'+ currentMeal +' table tbody').append(product);
      $('.js-del-product').click(deleteProduct);
    }
  });
}

function deleteMeal(event) {
  var meal_id = event.currentTarget.parentElement.id;
  $('#'+ meal_id +'').remove();
}

function deleteProduct(event) {
  var product_id = event.currentTarget.parentElement.parentElement.id;
  $('#'+ product_id +'').remove();
}
