Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get 'rankings', to: 'pages#rankings'

  get 'start_easy_game', to: 'games#start_easy_game'

  resources :games, only: ['show'] do
    member do
      get :leaderboard, as: :leaderboard
    end
  end

  resources :players, only: ['new', 'create', 'edit', 'update']
  get 'list', to: 'players#list'
  get 'ten_players', to: 'players#game_of_ten_easy'


  resource :user, only: [] do
    post :update_score, on: :collection
  end
end
