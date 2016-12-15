class OrdersController < ApplicationController
  def index
    @orders = current_user.orders
  end

  def show
    @order = Order.find_by(user_id: current_user.id, id: params[:id])
    @meals = @order.meals
  end

  def create
    # meals = JSON.parse params[:meals]
    # meals.each do |meal|
    #   meal.each do |key, value|
    #   end
    # end
    # binding.pry
  end
end
