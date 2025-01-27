class UsersController < ApplicationController
  before_action :authenticate_user!

  def update_score
    @user = current_user
    new_score = @user.points ? @user.points + params[:points].to_i : params[:points].to_i
    @user.available_games -= 1

    if @user.update(points: new_score)
      render json: { status: 'success', user: @user }
    else
      render json: { status: 'error', message: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

end
