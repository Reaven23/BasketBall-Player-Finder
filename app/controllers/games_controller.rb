class GamesController < ApplicationController
  def new
    @game = Game.new
  end

  def show
    @game = Game.find(params[:id])
  end

  def start_easy_game
    @game = Game.new
    @game.user = current_user
    @game.level = 'easy'
    @game.name = "Game n°#{current_user.games.last ? current_user.games.last.id + 1 : 1}"
    if @game.save!
      redirect_to game_path(@game)
    else
      redirect_to root_path
    end
  end

  def start_legend_game
    @game = Game.new
    @game.user = current_user
    @game.level = 'legend'
    @game.name = "Game n°#{current_user.games.last ? current_user.games.last.id + 1 : 1}"
    if @game.save!
      redirect_to game_path(@game)
    else
      redirect_to root_path
    end
  end

  def start_medium_game
    @game = Game.new
    @game.user = current_user
    @game.level = 'medium'
    @game.name = "Game n°#{current_user.games.last ? current_user.games.last.id + 1 : 1}"
    if @game.save!
      redirect_to game_path(@game)
    else
      redirect_to root_path
    end
  end

  def start_hard_game
    @game = Game.new
    @game.user = current_user
    @game.level = 'hard'
    @game.name = "Game n°#{current_user.games.last ? current_user.games.last.id + 1 : 1}"
    if @game.save!
      redirect_to game_path(@game)
    else
      redirect_to root_path
    end
  end

  require 'jaro_winkler'

  def test_jaro
    correct_answer = params[:correct_answer]
    user_answer = params[:user_answer]

    num = JaroWinkler.similarity(correct_answer, user_answer)
    render json: { jaro_num: num.round(4) }
  end

end
