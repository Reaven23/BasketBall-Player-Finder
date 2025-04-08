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
    @users_sorted_by_score = User.all.order(Arel.sql('COALESCE(points, 0) DESC'))
    current_level = @user.level
    previous_level = Level.find_by(number: current_level.number - 1)

    @next_level_points = current_level.points
    @current_level_points = current_level.number == 1 ? 0 : previous_level.points

    total_points_needed = @next_level_points - @current_level_points
    user_points_in_level = @user.points - @current_level_points
    @progression = ((user_points_in_level.to_f / total_points_needed) * 100).round(2)

    if params[:level].present?
      @games = @user.games.where(level: params[:level])
      @games_played = @games.count
      @points = @games.pluck(:score).compact.sum
      @possible_points = @games_played * 100
      @questions = @games_played * 100
    else
      @games_played = @user.games.count || 0
      @points = @user.points || 0
      @questions = @games_played * 100
      @possible_points = ((@user.games.where(level: "easy").count * 100) + (@user.games.where(level: "medium").count * 300) + (@user.games.where(level: "easy").count * 500) + (@user.games.where(level: "easy").count * 1000)) || 0
    end

    @possible_points > 0 ? @good_percentage = (@points.to_f / @possible_points * 100).floor : @good_percentage = 0
    @bad_percentage = (100 - @good_percentage)

  end
end
