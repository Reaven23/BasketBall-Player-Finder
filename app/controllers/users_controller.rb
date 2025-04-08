class UsersController < ApplicationController
  before_action :authenticate_user!

  def update_score
    @user = current_user
    new_score = @user.points ? @user.points + params[:points].to_i : params[:points].to_i
    @user.available_games -= 1
    @user.games.last.update(score: params[:points].to_i)

    if @user.update(points: new_score)
      if @user.points >= @user.level.points
         update_level(@user)
      end
      render json: { status: 'success', user: @user }
    else
      render json: { status: 'error', message: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def add_games_after_share
    if current_user
      if current_user.respond_to?(:available_games)
        current_user.increment!(:available_games, 2)
        render json: { success: true, games: current_user.available_games }
      else
        render json: { success: false, error: "Champ 'available_games' introuvable" }, status: 500
      end
    else
      render json: { success: false, error: "Utilisateur introuvable" }, status: 400
    end
  end

  private

  def update_level(user)
    correct_level = Level.where("points >= ?", user.points).order(:number).first

    if user.update(level: correct_level)
      Rails.logger.info "level update complete"
    else
      Rails.logger.error "level update failed"
    end
  end

end
