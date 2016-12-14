$(document).ready(initialize);

function initialize() {
  loadListeners();
  loadModal();
  setActiveClassToCurrentNavLink();
}

var order = { meals: [] };
var currentMeal;
var mealsCounter = 0;
var productsCounter = 0;

var objCalories = getObjectiveCalories();
var objProtein = getObjectiveProtein();
var objFat = getObjectiveFat();
var objCarbs = getObjectiveCarbs();

function updateStatus() {
  console.log(order);

  //calories
  // var pbCalories = 0;
  // var pbCaloriesProgress = 0;
  // for (var i = 0; i < totalCalories.length; i++) {
  //   pbCalories += totalCalories[i];
  // }
  // pbCaloriesProgress = pbCalories / (objCalories / 100);
  // $('.js-pb-calories .pb-label').text(pbCalories +' / '+ objCalories);
  // $('.js-pb-calories .pb-bar').css('width', pbCaloriesProgress +'%');

  //protein
  // var pbProtein = 0;
  // var pbProteinProgress = 0;
  // for (var i = 0; i < totalProtein.length; i++) {
  //   pbProtein += totalProtein[i];
  // }
  // pbProteinProgress = pbProtein / (objProtein / 100);
  // $('.js-pb-protein .pb-label').text(pbProtein +' / '+ objProtein);
  // $('.js-pb-protein .pb-bar').css('width', pbProteinProgress +'%');

  //fat
  // var pbFat = 0;
  // var pbFatProgress = 0;
  // for (var i = 0; i < totalFat.length; i++) {
  //   pbFat += totalFat[i];
  // }
  // pbFatProgress = pbFat / (objFat / 100);
  // $('.js-pb-fat .pb-label').text(pbFat +' / '+ objFat);
  // $('.js-pb-fat .pb-bar').css('width', pbFatProgress +'%');

  //carbs
  // var pbCarbs = 0;
  // var pbCarbsProgress = 0;
  // for (var i = 0; i < totalCarbs.length; i++) {
  //   pbCarbs += totalCarbs[i];
  // }
  // pbCarbsProgress = pbCarbs / (objCarbs / 100);
  // $('.js-pb-carbs .pb-label').text(pbCarbs +' / '+ objCarbs);
  // $('.js-pb-carbs .pb-bar').css('width', pbCarbsProgress +'%');

  //price
  // var orderPrice = 0;
  // for (var i = 0; i < totalPrice.length; i++) {
  //   orderPrice += totalPrice[i];
  // }
  // $('.js-total').text('Total: '+ orderPrice.toFixed(2) +' €');

  enableDisableBuyButton();
}

function addMeal() {
  //set an unique id for meal
  var idMeal = 'meal'+ mealsCounter++;

  //push meal object to meals array (of order)
  order.meals.push({id: idMeal, products: []});

  var meal = '<li class="collection-item" id="'+ idMeal +'">';
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
  //find object meal and set index of array
  var meal = order.meals.find(function(meal) {
    return meal.id === idMeal;
  });
  var indexMeal = order.meals.indexOf(meal);

  //delete object from meals array
  order.meals.splice(indexMeal, 1);

  //delete from view
  $('#'+ idMeal).remove(); //view delete meal

  //update
  updateStatus();
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
  //set an unique id for product
  var idProduct = 'product'+ productsCounter++;

  //find object meal
  var meal = order.meals.find(function(meal) {
    return meal.id === currentMeal;
  });

  //push product object to products array (of meal)
  meal.products.push({
    idProduct: idProduct,
    id: response.id,
    calories: response.calories,
    protein: response.protein,
    fat: response.fat,
    carbs: response.carbs,
    amount: 100,
    price: response.price,
    totalPrice: response.price
  });

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

  //update
  updateStatus();
}

function removeProduct(idMeal, idProduct) {
  //find object meal and set index of array
  var meal = order.meals.find(function(meal) {
    return meal.id === idMeal;
  });
  var indexMeal = order.meals.indexOf(meal);

  //find object product and set index of array
  var product = meal.products.find(function(product) {
    return product.idProduct === idProduct;
  });
  var indexProduct = order.meals[indexMeal].products.indexOf(product);

  //delete product from products array
  order.meals[indexMeal].products.splice(indexProduct, 1);

  //delete product from view
  $('#'+ idProduct).remove();

  //update
  updateStatus();
}

function addAmount(idMeal, idProduct) {
  //find object meal and set index of array
  var meal = order.meals.find(function(meal) {
    return meal.id === idMeal;
  });
  var indexMeal = order.meals.indexOf(meal);

  //find object product and set index of array
  var product = meal.products.find(function(product) {
    return product.idProduct === idProduct;
  });
  var indexProduct = order.meals[indexMeal].products.indexOf(product);

  //set amount increment
  order.meals[indexMeal].products[indexProduct].amount += 100;
  amount = order.meals[indexMeal].products[indexProduct].amount;

  //set price increment
  productPrice = order.meals[indexMeal].products[indexProduct].price;
  order.meals[indexMeal].products[indexProduct].totalPrice += productPrice;
  totalPrice = order.meals[indexMeal].products[indexProduct].totalPrice;

  //print new amount and new price
  $('#'+ idProduct +' .amount').text(amount +' gr');
  $('#'+ idProduct +' .price').text((totalPrice).toFixed(2) +' €');

  //enable or disable substract button
  enableDisableSubstractButton(amount, idProduct);

  //update
  updateStatus();
}

function substractAmount(idMeal, idProduct) {
  //find object meal and set index of array
  var meal = order.meals.find(function(meal) {
    return meal.id === idMeal;
  });
  var indexMeal = order.meals.indexOf(meal);

  //find object product and set index of array
  var product = meal.products.find(function(product) {
    return product.idProduct === idProduct;
  });
  var indexProduct = order.meals[indexMeal].products.indexOf(product);

  //set amount increment
  order.meals[indexMeal].products[indexProduct].amount -= 100;
  amount = order.meals[indexMeal].products[indexProduct].amount;

  //set price increment
  productPrice = order.meals[indexMeal].products[indexProduct].price;
  order.meals[indexMeal].products[indexProduct].totalPrice -= productPrice;
  totalPrice = order.meals[indexMeal].products[indexProduct].totalPrice;

  //print new amount and new price
  $('#'+ idProduct +' .amount').text(amount +' gr');
  $('#'+ idProduct +' .price').text((totalPrice).toFixed(2) +' €');

  //enable or disable substract button
  enableDisableSubstractButton(amount, idProduct);

  //update
  updateStatus();
}

function enableDisableSubstractButton(amount, idProduct) {
  if(amount > 100) {
    $('#'+ idProduct +' .js-substractAmount').removeClass('disabled');
    $('#'+ idProduct +' .js-substractAmount').removeClass('grey');
    $('#'+ idProduct +' .js-substractAmount').addClass('red accent-1');
  }
  if(amount === 100) {
    $('#'+ idProduct +' .js-substractAmount').addClass('disabled');
    $('#'+ idProduct +' .js-substractAmount').addClass('grey');
  }
}

function enableDisableBuyButton() {
  var total = 0;
  // for (var i = 0; i < totalPrice.length; i++) {
  //   total += totalPrice[i];
  // }

  if (total === 0) {
    $('.buy').addClass('disabled');
    $('.buy').addClass('grey');
  }
  else {
    $('.buy').removeClass('disabled');
    $('.buy').removeClass('grey');
  }
}

function loadListeners() {
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
    idMeal = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    idProduct = event.currentTarget.parentElement.parentElement.id;
    addAmount(idMeal, idProduct);
  });

  $('.js-order').on('click', '.js-substractAmount', function(event) {
    idMeal = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    idProduct = event.currentTarget.parentElement.parentElement.id;
    substractAmount(idMeal, idProduct);
  });

  $('.js-order').on('click', '.js-removeProduct', function(event) {
    idMeal = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    idProduct = event.currentTarget.parentElement.parentElement.id;
    removeProduct(idMeal, idProduct);
  });
}

function loadModal() {
  $('.modal').modal();
}

function setActiveClassToCurrentNavLink() {
  $('.js-nav-link-order').addClass('active');
}

function getObjectiveCalories() {
  return parseInt(($('.js-pb-calories .pb-label').text()).split('/')[1]);
}

function getObjectiveProtein() {
  return parseInt(($('.js-pb-protein .pb-label').text()).split('/')[1]);
}

function getObjectiveFat() {
  return parseInt(($('.js-pb-fat .pb-label').text()).split('/')[1]);
}

function getObjectiveCarbs() {
  return parseInt(($('.js-pb-carbs .pb-label').text()).split('/')[1]);
}
