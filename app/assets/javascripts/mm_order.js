var meals_counter = 1;
$(document).ready(initialize);

function initialize() {
  var products_counter = 1;
  $('.js-nav-links li').removeClass('active');
  $('.js-nav-link-order').addClass('active');
  $('#modal-products').modal();
  $('.js-add-meal').click(addMeal);
}

function addMeal() {
  var meal = '<li class="collection-item" id="meal'+ meals_counter +'">';
  meal += '<table class="js-meal highlight centered responsive-table">';
  meal += '<thead><tr>';
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
  meal += '<a class="js-add-product waves-effect waves-light btn lime">';
  meal += '<i class="material-icons left">add</i>Añadir Producto</a>';
  meal += ' ' //buttons spacer
  meal += '<a class="js-del-meal waves-effect waves-light btn red">';
  meal += '<i class="material-icons">delete</i></a></li>';

  $('.js-collection').append(meal);
  $('.js-add-product').click(loadProducts);
  $('.js-del-meal').click(deleteMeal);
}



function loadProducts() {
  $.ajax({
    type: 'GET',
    url: '/api/products',
    success: showProducts
  });
}

function showProducts(response) {
  $('#modal-products').modal('open');
  var products = '';
  for (var i = 0; i < response.length; i++) {
    products += '<a class="collection-item">' + response[i].name + '<br>';
    products += '<a class="js-adding-product waves-effect waves-light btn" id="' + response[i].id + '">';
    products += '<i class="material-icons">add</i>Añadir</a></a>';
  }
  $('.js-products').append(products);
  $('.js-adding-product').click(addProduct);
}

function addProduct(event) {
  var idProduct = event.currentTarget.id;
  $.ajax({
    type: 'GET',
    url: '/api/products/' + idProduct,
    success: function(response) {
      var product = '<tr>';
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
      product += '<a class="waves-effect waves-light btn red"><i class="material-icons">delete</i></a>';
      product += '</td>';
      product += '<td>'+ response.price +' €</td>';
      product += '</tr>';

      $('.js-meal tbody').append(product);
      msg('Añadido: '+ response.name, 1000);
    }
  });
}

function deleteMeal(event) {
  var meal_id = event.currentTarget.parentElement.id;
  $('#'+ meal_id +'').remove();
}
