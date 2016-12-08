Rails.application.routes.draw do
  # site
  root to: "site#index"
  get '/objective', to: 'site#objective'

  # users/devise
  post '/users/generate_objective', to: 'users#generate_objective'
  devise_for :users
  resource :users

  # products
  resources :products

  #orders
  resources :orders
end
