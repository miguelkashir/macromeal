Rails.application.routes.draw do
  # site
  root to: "site#index"
  get '/objective', to: 'site#objective'

  # users/devise
  post '/users/generate_objective', to: 'users#generate_objective'
  devise_for :users
  resource :users

  # products
  resources :products, only: [:index, :show]

  #orders
  resources :orders, only: [:index, :show, :new]

  namespace :api do
    resources :products
  end
end
