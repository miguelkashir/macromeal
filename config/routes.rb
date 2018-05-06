Rails.application.routes.draw do
  root to: "site#index"

  devise_for :users
  resource :users
  post '/users/generate_objective', to: 'users#generate_objective'
  get '/objective', to: 'site#objective'

  resources :orders

  resources :products

  namespace :api do
    resources :products
  end
end
