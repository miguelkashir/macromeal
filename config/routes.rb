Rails.application.routes.draw do
  # site
  root to: "site#index"
  get '/objective', to: 'site#objective'

  # users/devise
  devise_for :users
  resource :users
  patch '/users/generate_objective', to: 'users#generate_objective'

  # products
  resources :products

  #orders
  resources :orders
end
