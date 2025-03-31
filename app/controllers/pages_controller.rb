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
  end
end
