class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def start_easy_game
    @game = Game.new
    @game.user = current_user
    @game.name = "Game n°#{Game.last ? Game.last.id + 1 : 1}"
    if @game.save!
      redirect_to game_path(@game)
    else
      redirect_to root_path
    end
  end

  def leaderboard
  end
end
