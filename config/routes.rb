Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  get 'start_easy_game', to: 'games#start_easy_game'

  resources :games, only: ['show'] do
    member do
      get :leaderboard, as: :leaderboard
    end
  end

  resources :players, only: ['new', 'create', 'index', 'edit', 'update', 'show']
  get 'list', to: 'players#list'
  get 'ten_players', to: 'players#game_of_ten_easy'

end
