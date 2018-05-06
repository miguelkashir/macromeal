class OrdersController < ApplicationController
  def index
    @orders = current_user.orders
  end

  def show
    @order = Order.find_by(user_id: current_user.id, id: params[:id])
  end

  def create
    meals = params[:meals];

    # create order
    order = Order.create(user_id: current_user.id)

    (0..meals.length - 1).each do |i|

      #create meal / ordermeal
      meal = Meal.create
      OrderMeal.create(order_id: order.id, meal_id: meal.id)

      (0..meals[i.to_s]['products'].length - 1).each do |j|

        id_product = meals[i.to_s]['products'][j.to_s]['id']
        amount_product = meals[i.to_s]['products'][j.to_s]['amount']
        price_product = meals[i.to_s]['products'][j.to_s]['totalPrice']

        # create mealproduct
        MealProduct.create(meal_id: meal.id, product_id: id_product, amount: amount_product, price: price_product)
      end
    end

    redirect_to "/orders/#{order.id}"
  end

end
