# .macromeal
Macromeal is the web application of a food delivery business, with the ability of **customize the amount of each product at each meal**, based on the user objective (for example: consume certain calories weight gain/loss, consume certain macronutrient to gain muscle, etc)

## functionalities
* User control (register, login, profile, sessions control, etc)
* Generate user objective
* Add meals to order
* Add products to meals
* Modify the amount of any product
* Display (with [progress bars](http://www.w3schools.com/bootstrap/bootstrap_progressbars.asp "Bootstrap's progressbars")) the user objective status
* Order checkout (simulation)

## tables
|PRODUCT|
|:-:|
|**id** :: *primary_key*|
|**name** :: *string*|
|**description** :: *string*|
|**img** :: *string*|
|**calories** :: *int*|
|**protein** :: *int*|
|**fat** :: *int*|
|**carbs** :: *int*|
|**price** :: *float*|
|**category** :: *string*|

<hr>

|MEAL|
|:-:|
|**id** :: *primary_key*|
|**name** :: *string*|

<hr>

|MEALPRODUCT|
|:-:|
|**id** :: *primary_key*|
|**meal_id** :: foreign_key|
|**quantity** :: *integer*|
|**price** :: *integer*|

<hr>

|ORDER|
|:-:|
|**id** :: *primary_key*|
|**user_id** :: *foreign_key*|

<hr>

|ORDERMEAL|
|:-:|
|**id** :: *primary_key*|
|**order_id** :: *foreign_key*|
|**meal_id** :: *foreign_key*|

<hr>

|USER|
|:-:|
|**id** :: *primary_key*|
|**user** :: *string*|
|**email** :: *string*|
|**password** :: *string*|
|**user_calories** :: *integer*|
|**user_protein** :: *integer*|
|**user_fat** :: *integer*|
|**user_carbs** :: *integer*|
