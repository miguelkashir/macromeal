$(document).ready(initialize);

var currentMeal;
var mealsCounter = 0;
var productsCounter = 0;

var objCalories = 0;
var objProtein = 0;
var objFat = 0;
var objCarbs = 0;

var origProdId = [];
var origProdCalories = [];
var origProdProtein = [];
var origProdFat = [];
var origProdCarbs = [];
var origProdPrice = [];

var totalCalories = [];
var totalProtein = [];
var totalFat = [];
var totalCarbs = [];
var totalPrice = [];

function initialize() {

  setObjective();
  setActiveClassToCurrentNavLink();
  $('.modal').modal();

  $('.js-order').on('click', '.js-addMeal', function(event) {
    addMeal();
  });

  $('.js-order').on('click', '.js-removeMeal', function(event) {
    removeMeal(event.currentTarget.parentElement.id);
  });

  $('.js-order').on('click', '.js-getProducts', function(event) {
    getProducts(event.currentTarget.parentElement.id);
  });

  $('.js-order').on('click', '.js-addProduct', function(event) {
    idProduct = event.currentTarget.id;
    getProduct(idProduct);
  });

  $('.js-order').on('click', '.js-addAmount', function(event) {
    idProduct = event.currentTarget.parentElement.parentElement.id;
    addAmount(idProduct);
  });

  $('.js-order').on('click', '.js-substractAmount', function(event) {
    idProduct = event.currentTarget.parentElement.parentElement.id;
    substractAmount(idProduct);
  });

  $('.js-order').on('click', '.js-removeProduct', function(event) {
    idProduct = event.currentTarget.parentElement.parentElement.id;
    removeProduct(idProduct);
  });

}

function setActiveClassToCurrentNavLink() {
  $('.js-nav-link-order').addClass('active');
}

function setObjective() {
  objCalories = parseInt(($('.js-pb-calories .pb-label').text()).split('/')[1]);
  objProtein = parseInt(($('.js-pb-protein .pb-label').text()).split('/')[1]);
  objFat = parseInt(($('.js-pb-fat .pb-label').text()).split('/')[1]);
  objCarbs = parseInt(($('.js-pb-carbs .pb-label').text()).split('/')[1]);
}

function updateStatus() {
  //calories
  var pbCalories = 0;
  var pbCaloriesProgress = 0;
  for (var i = 0; i < totalCalories.length; i++) {
    pbCalories += totalCalories[i];
  }
  pbCaloriesProgress = pbCalories / (objCalories / 100);
  $('.js-pb-calories .pb-label').text(pbCalories +' / '+ objCalories);
  $('.js-pb-calories .pb-bar').css('width', pbCaloriesProgress +'%');

  //protein
  var pbProtein = 0;
  var pbProteinProgress = 0;
  for (var i = 0; i < totalProtein.length; i++) {
    pbProtein += totalProtein[i];
  }
  pbProteinProgress = pbProtein / (objProtein / 100);
  $('.js-pb-protein .pb-label').text(pbProtein +' / '+ objProtein);
  $('.js-pb-protein .pb-bar').css('width', pbProteinProgress +'%');

  //fat
  var pbFat = 0;
  var pbFatProgress = 0;
  for (var i = 0; i < totalFat.length; i++) {
    pbFat += totalFat[i];
  }
  pbFatProgress = pbFat / (objFat / 100);
  $('.js-pb-fat .pb-label').text(pbFat +' / '+ objFat);
  $('.js-pb-fat .pb-bar').css('width', pbFatProgress +'%');

  //carbs
  var pbCarbs = 0;
  var pbCarbsProgress = 0;
  for (var i = 0; i < totalCarbs.length; i++) {
    pbCarbs += totalCarbs[i];
  }
  pbCarbsProgress = pbCarbs / (objCarbs / 100);
  $('.js-pb-carbs .pb-label').text(pbCarbs +' / '+ objCarbs);
  $('.js-pb-carbs .pb-bar').css('width', pbCarbsProgress +'%');

  //price
  var orderPrice = 0;
  for (var i = 0; i < totalPrice.length; i++) {
    orderPrice += totalPrice[i];
  }
  $('.js-total').text('Total: '+ orderPrice.toFixed(2) +' €');

  enableDisableBuyButton();
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
  meal += '<a class="js-getProducts waves-effect waves-light btn lime" id="js-getProducts-meal'+ idMeal +'">';
  meal += '<i class="material-icons left">add</i>Añadir Producto</a> ';
  meal += '<a class="js-removeMeal waves-effect waves-light btn red">';
  meal += '<i class="material-icons">delete</i></a></li>';
  $('.js-collection').append(meal);
}

function removeMeal(idMeal) {
  var count = $('#'+ idMeal +' tbody tr').length;
  for (var i = 0; i < count; i++) {
    var idProduct = $('#'+ idMeal +' tbody tr:first-child').attr('id');
    removeProduct(idProduct);
  }
  $('#'+ idMeal).remove();
  updateStatus();
  enableDisableBuyButton();
}

function getProducts(idMeal) {
  $.ajax({
    type: 'GET',
    url: '/api/products',
    success: function(response) {
      showProducts(idMeal, response);
    }
  });
}

function showProducts(idMeal, response) {
  $('.modal').modal('open');
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
    products += '<a id="'+ response[i].id +'"';
    products += 'class="js-addProduct waves-effect waves-light btn">';
    products += 'Añadir</a>';
    products += '</div></div></div><div><br>';
  }
  $('.js-products').empty();
  $('.js-products').append(products);
}

function getProduct(idProduct) {
  $.ajax({
    type: 'GET',
    url: '/api/products/' + idProduct,
    success: addProduct
  });
}

function addProduct(response) {
  var idProduct = 'product-'+ productsCounter++; //unique id for product
  var product = '<tr class="td-product"id="'+ idProduct +'">';
  product += '<td>'+ response.name +'</td>';
  product += '<td class="amount">100 gr</td>';
  product += '<td><a class="js-addAmount waves-effect waves-light btn">';
  product += '<i class="material-icons">add</i></a>';
  product += '<a class="js-substractAmount waves-effect waves-light btn grey disabled">';
  product += '<i class="material-icons">remove</i></a></td>';
  product += '<td><a class="js-removeProduct waves-effect waves-light btn red">';
  product += '<i class="material-icons">delete</i></a></td>';
  product += '<td class="price">'+ response.price +' €</td>';
  product += '</tr>';

  //print product and message
  $('#'+ currentMeal +' table tbody').append(product);
  msg('Añadido: '+ response.name, 1000);

  //add to total
  totalCalories.push(response.calories);
  totalProtein.push(response.protein);
  totalFat.push(response.fat);
  totalCarbs.push(response.carbs);
  totalPrice.push(response.price);

  //save product info
  origProdId.push(response.id);
  origProdCalories.push(response.calories);
  origProdProtein.push(response.protein);
  origProdFat.push(response.fat);
  origProdCarbs.push(response.carbs);
  origProdPrice.push(response.price);

  updateStatus();
}

function removeProduct(idProduct) {
  $('#'+ idProduct).remove();

  //"remove" from total
  index = idProduct.split('-')[1];
  totalCalories[index] = 0;
  totalProtein[index] = 0;
  totalFat[index] = 0;
  totalCarbs[index] = 0;
  totalPrice[index] = 0;

  //remove product info
  origProdCalories[index] = 0;
  origProdProtein[index] = 0;
  origProdFat[index] = 0;
  origProdCarbs[index] = 0;
  origProdPrice[index] = 0;

  updateStatus();
}

function addAmount(idProduct) {
  var currentAmount = parseInt(($('#'+ idProduct +' .amount').text()).split(' ')[0]);
  currentAmount += 100;
  $('#'+ idProduct +' .amount').text(currentAmount +' gr');

  //calculate total
  index = idProduct.split('-')[1];
  console.log(index);
  totalCalories[index] += origProdCalories[index];
  totalProtein[index] += origProdProtein[index];
  totalFat[index] += origProdFat[index];
  totalCarbs[index] += origProdCarbs[index];
  totalPrice[index] += origProdPrice[index];

  $('#'+ idProduct +' .price').text((totalPrice[index]).toFixed(2) +' €');
  updateStatus();
  enableDisableSubstractButton(currentAmount, idProduct);
}

function substractAmount(idProduct) {
  var currentAmount = parseInt($('#'+ idProduct +' .amount').text().split(' ')[0]);
  currentAmount -= 100;
  $('#'+ idProduct +' .amount').text(currentAmount +' gr');

  //calculate total
  index = idProduct.split('-')[1];
  console.log(index);
  totalCalories[index] -= origProdCalories[index];
  totalProtein[index] -= origProdProtein[index];
  totalFat[index] -= origProdFat[index];
  totalCarbs[index] -= origProdCarbs[index];
  totalPrice[index] -= origProdPrice[index];

  $('#'+ idProduct +' .price').text((totalPrice[index]).toFixed(2) +' €');
  updateStatus();
  enableDisableSubstractButton(currentAmount, idProduct);
}

function enableDisableSubstractButton(currentAmount, idProduct) {
  if(currentAmount > 100) {
    $('#'+ idProduct +' .js-substractAmount').removeClass('disabled');
    $('#'+ idProduct +' .js-substractAmount').removeClass('grey');
    $('#'+ idProduct +' .js-substractAmount').addClass('red accent-1');
  }
  if(currentAmount === 100) {
    $('#'+ idProduct +' .js-substractAmount').addClass('disabled');
    $('#'+ idProduct +' .js-substractAmount').addClass('grey');
  }
}

function enableDisableBuyButton() {
  var total = 0;
  for (var i = 0; i < totalPrice.length; i++) {
    total += totalPrice[i];
  }

  if (total === 0) {
    $('.buy').addClass('disabled');
    $('.buy').addClass('grey');
  }
  else {
    $('.buy').removeClass('disabled');
    $('.buy').removeClass('grey');
  }
}
