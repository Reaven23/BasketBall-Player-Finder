class UsersController < ApplicationController
  before_action :authenticate_user!
  after_initialize set_avaiable_games, if: :new_record?

  def update_score
    @user = current_user
    new_score = @user.points ? @user.points + params[:points].to_i : params[:points].to_i

    if @user.update(points: new_score)
      render json: { status: 'success', user: @user }
    else
      render json: { status: 'error', message: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  private

  def set_avaiable_games
    self.set_avaiable_games ||= 2
  end
end
