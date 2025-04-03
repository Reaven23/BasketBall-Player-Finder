class UsersController < ApplicationController
  before_action :authenticate_user!

  def update_score
    @user = current_user
    new_score = @user.points ? @user.points + params[:points].to_i : params[:points].to_i
    @user.available_games -= 1
    @user.games.last.update(score: params[:points].to_i)

    if @user.update(points: new_score)
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

end
