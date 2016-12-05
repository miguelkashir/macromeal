Rails.application.routes.draw do
  # site
  root to: "site#index"

  # users/devise
  devise_for :users
  resource :users

  # products
  resources :products
end
