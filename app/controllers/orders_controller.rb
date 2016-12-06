class OrdersController < ApplicationController
  def index
    @orders = Order.where('user_id = ?', current_user.id)
  end

  def show
    @order = Order.find_by(user_id: current_user.id, id: params[:id])
  end
end
