Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  resources :players, only: ['new', 'create', 'index']
  resources :games, only: ['new', 'create', 'show'] do
    member do
      get :leaderboard, as: :leaderboard
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
