Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get 'rankings', to: 'pages#rankings'
  get 'about', to: 'pages#about'
  get 'contact', to: 'pages#contact'
  get 'dashboard', to: 'pages#dashboard', as: :dashboard

  get 'start_easy_game', to: 'games#start_easy_game'
  get 'start_medium_game', to: 'games#start_medium_game'
  get 'start_hard_game', to: 'games#start_hard_game'
  get 'start_legend_game', to: 'games#start_legend_game'

  post 'test_jaro', to: 'games#test_jaro'

  resources :games, only: ['show']

  resources :players, only: ['new', 'create', 'edit', 'update']
  get 'ten_players_easy', to: 'players#game_of_ten_easy'
  get 'ten_players_medium', to: 'players#game_of_ten_medium'
  get 'ten_players_hard', to: 'players#game_of_ten_hard'
  get 'ten_players_legend', to: 'players#game_of_ten_legend'


  resource :user, only: [] do
    post :update_score, on: :collection
  end
  post "/user/add_games_after_share", to: "users#add_games_after_share"

end
