Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  get 'start_game', to: 'games#start_game'

  resources :games, only: ['show'] do
    member do
      get :leaderboard, as: :leaderboard
    end
  end

  resources :players, only: ['new', 'create', 'index', 'edit', 'update']
  get 'list', to: 'players#list'

  # Other routes go here if you have any

end
