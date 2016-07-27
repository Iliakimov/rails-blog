Rails.application.routes.draw do

  devise_for :users
  root 'home#index'

  get 'persons/profile', as: 'user_root'

  resources :categories do

  end

  resources :articles do
    resources :comments
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
