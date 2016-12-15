Rails.application.routes.draw do
  root to: "site#index"
  get '/objective', to: 'site#objective'
  post '/users/generate_objective', to: 'users#generate_objective'
  resource :users
  devise_for :users

  resources :orders

  resources :products

  namespace :api do
    resources :products
  end
end
