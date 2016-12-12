$(document).ready(initialize);
var currentMeal;

var mealsCounter = 0;
var productsCounter = 0;

var objCalories = 0;
var objProtein = 0;
var objFat = 0;
var objCarbs = 0;

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


  //add meal
  $('.js-order').on('click', '.js-addMeal', function(event) {
    addMeal();
  });

  //remove meal
  $('.js-order').on('click', '.js-removeMeal', function(event) {
    removeMeal(event.currentTarget.parentElement.id);
  });

  //get products
  $('.js-order').on('click', '.js-getProducts', function(event) {
    getProducts(event.currentTarget.parentElement.id);
  });

  //add product
  $('.js-order').on('click', '.js-addProduct', function(event) {
    idProduct = event.currentTarget.id;
    getProduct(idProduct);
  });

  //add product amount
  $('.js-order').on('click', '.js-addAmount', function(event) {
    idProduct = event.currentTarget.parentElement.parentElement.id;
    addAmount(idProduct);
  });

  //substract product amount
  $('.js-order').on('click', '.js-substractAmount', function(event) {
    idProduct = event.currentTarget.parentElement.parentElement.id;
    substractAmount(idProduct);
  });

  //remove product
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
  var pbCalories = 0;
  var pbCaloriesProgress = 0;
  for (var i = 0; i < totalCalories.length; i++) {
    pbCalories += totalCalories[i];
  }
  pbCaloriesProgress = pbCalories / (objCalories / 100);
  $('.js-pb-calories .pb-label').text(pbCalories +' / '+ objCalories);
  $('.js-pb-calories .pb-bar').css('width', pbCaloriesProgress +'%');

  var pbProtein = 0;
  var pbProteinProgress = 0;
  for (var i = 0; i < totalProtein.length; i++) {
    pbProtein += totalProtein[i];
  }
  pbProteinProgress = pbProtein / (objProtein / 100);
  $('.js-pb-protein .pb-label').text(pbProtein +' / '+ objProtein);
  $('.js-pb-protein .pb-bar').css('width', pbProteinProgress +'%');

  var pbFat = 0;
  var pbFatProgress = 0;
  for (var i = 0; i < totalFat.length; i++) {
    pbFat += totalFat[i];
  }
  pbFatProgress = pbFat / (objFat / 100);
  $('.js-pb-fat .pb-label').text(pbFat +' / '+ objFat);
  $('.js-pb-fat .pb-bar').css('width', pbFatProgress +'%');

  var pbCarbs = 0;
  var pbCarbsProgress = 0;
  for (var i = 0; i < totalCarbs.length; i++) {
    pbCarbs += totalCarbs[i];
  }
  pbCarbsProgress = pbCarbs / (objCarbs / 100);
  $('.js-pb-carbs .pb-label').text(pbCarbs +' / '+ objCarbs);
  $('.js-pb-carbs .pb-bar').css('width', pbCarbsProgress +'%');
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
  $('#'+ idMeal).remove();
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
  var product = '<tr id="'+ idProduct +'">';
  product += '<td>'+ response.name +'</td>';
  product += '<td class="amount">100 gr</td>';
  product += '<td><a class="js-addAmount waves-effect waves-light btn">';
  product += '<i class="material-icons">add</i></a>';
  product += '<a class="js-substractAmount waves-effect waves-light btn grey disabled">';
  product += '<i class="material-icons">remove</i></a></td>';
  product += '<td><a class="js-removeProduct waves-effect waves-light btn red">';
  product += '<i class="material-icons">delete</i></a></td>';
  product += '<td>'+ response.price +' €</td>';
  product += '</tr>';

  //print product and message
  $('#'+ currentMeal +' table tbody').append(product);
  msg('Añadido: '+ response.name, 1000);

  //status info
  totalCalories.push(response.calories);
  totalProtein.push(response.protein);
  totalFat.push(response.fat);
  totalCarbs.push(response.carbs);
  totalPrice.push(response.price);

  //save product info
  origProdCalories.push(response.calories);
  origProdProtein.push(response.protein);
  origProdFat.push(response.fat);
  origProdCarbs.push(response.carbs);
  origProdPrice.push(response.price);

  updateStatus();
}

function removeProduct(idProduct) {
  $('#'+ idProduct).remove();

  //remove from total
  idProduct = idProduct.split('-')[1];
  totalCalories.splice(idProduct, 1);
  totalProtein.splice(idProduct, 1);
  totalFat.splice(idProduct, 1);
  totalCarbs.splice(idProduct, 1);
  updateStatus();
}

function addAmount(idProduct) {
  var currentAmount = parseInt(($('#'+ idProduct +' .amount').text()).split(' ')[0]);
  currentAmount += 100;
  $('#'+ idProduct +' .amount').text(currentAmount +' gr');
  if(currentAmount > 100) {
    $('#'+ idProduct +' .js-substractAmount').removeClass('disabled');
    $('#'+ idProduct +' .js-substractAmount').removeClass('grey');
    $('#'+ idProduct +' .js-substractAmount').addClass('red accent-1');
  }
  //calculate total
  idProduct = idProduct.split('-')[1];
  totalCalories[idProduct] += origProdCalories[idProduct];
  totalProtein[idProduct] += origProdProtein[idProduct];
  totalFat[idProduct] += origProdFat[idProduct];
  totalCarbs[idProduct] += origProdCarbs[idProduct];
  totalPrice[idProduct] += origProdPrice[idProduct];
  updateStatus();
}

function substractAmount(idProduct) {
  var currentAmount = parseInt($('#'+ idProduct +' .amount').text().split(' ')[0]);
  currentAmount -= 100;
  $('#'+ idProduct +' .amount').text(currentAmount +' gr');
  if(currentAmount === 100) {
    $('#'+ idProduct +' .js-substractAmount').addClass('disabled');
    $('#'+ idProduct +' .js-substractAmount').addClass('grey');
  }

  //calculate total
  idProduct = idProduct.split('-')[1];
  totalCalories[idProduct] -= origProdCalories[idProduct];
  totalProtein[idProduct] -= origProdProtein[idProduct];
  totalFat[idProduct] -= origProdFat[idProduct];
  totalCarbs[idProduct] -= origProdCarbs[idProduct];
  totalPrice[idProduct] -= origProdPrice[idProduct];
  updateStatus();
}
