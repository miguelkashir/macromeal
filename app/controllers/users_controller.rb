class UsersController < ApplicationController
  before_action :authenticate_user!
  before_filter :find_user

  def generate_objective
    @user.calories = @user.calculate_mb
    @user.save
    redirect_to '/objective'
  end

  private

  def find_user
    @user = current_user
  end
end
