class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :name, :address, :cp, :city, :country, :phone, :sex, :age, :height, :weight, :activity
    ])
  end
end
