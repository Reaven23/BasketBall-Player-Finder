class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :rankings ]

  def home
  end

  def rankings
    @users_sorted_by_score = User.all.order(Arel.sql('COALESCE(points, 0) DESC'))
  end

  def contact
  end

  def about
  end

  def dashboard
    @user = current_user
    current_level = @user.level
    previous_level = Level.find_by(number: current_level.number - 1)

    @next_level_points = current_level.points
    @current_level_points = current_level.number == 1 ? 0 : previous_level.points

    total_points_needed = @next_level_points - @current_level_points
    user_points_in_level = @user.points - @current_level_points
    @progression = ((user_points_in_level.to_f / total_points_needed) * 100).round(2)

    @easy_games = @user.games.where(level: "easy")
    @easy_games_played = @easy_games.count
    @easy_points = @easy_games.pluck(:score).compact.sum
    @possible_easy_points = @easy_games_played * 100

    medium_games = @user.games.where(level: "medium")
    @medium_games_played = medium_games.count
    @medium_points = medium_games.pluck(:score).compact.sum
    @possible_medium_points = @medium_games_played * 300

    hard_games = @user.games.where(level: "hard")
    @hard_games_played = hard_games.count
    @hard_points = hard_games.pluck(:score).compact.sum
    @possible_hard_points = @hard_games_played * 500

    legend_games = @user.games.where(level: "legend")
    @legend_games_played = legend_games.count
    @legend_points = legend_games.pluck(:score).compact.sum
    @possible_legend_points = @legend_games_played * 1000

    @games_played = (@legend_games_played + @hard_games_played + @medium_games_played + @easy_games_played ) || 0
    @global_points = (@easy_points + @medium_points + @hard_points + @legend_points) || 0
    @global_possible_points = (@possible_easy_points + @possible_medium_points + @possible_hard_points + @possible_legend_points) || 0
  end
end
