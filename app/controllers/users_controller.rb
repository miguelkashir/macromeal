class UsersController < ApplicationController
  require 'pry'

  before_action :authenticate_user!
  before_action :find_user

  def generate_objective
    cals = @user.calculate_calories

    par_protein = params[:protein].to_f
    par_fat = params[:fat].to_f
    par_carbs = params[:carbs].to_f
    par_objective = params[:objective].to_i

    cals -= (cals * 0.15) if par_objective == 0 #definition
    cals *= 1.15 if par_objective == 2 #volume

    @user.calories = cals
    @user.protein = @user.calculate_protein(cals, par_protein)
    @user.fat = @user.calculate_fat(cals, par_fat)
    @user.carbs = @user.calculate_carbs(cals, par_carbs)
    @user.save
    redirect_to '/objective'
  end

  private
  def find_user
    @user = current_user
  end
end
