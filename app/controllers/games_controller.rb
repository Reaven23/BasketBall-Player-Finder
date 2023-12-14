class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def create
    @game = Game.new
    @game.user = current_user
    if @game.save!
      redirect_to game_path(@game)
    else
      redirect_to root_path
    end
  end

  def leaderboard
  end
end
