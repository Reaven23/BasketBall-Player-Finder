class PlayersController < ApplicationController

  def index
    @players = Player.all
    render json: @players
  end

  def show
    @player = Player.find(params[:id])
    render json: @player
  end

  def new
    @player = Player.new
  end

  def create
    @player = Player.new(player_params)
    if @player.save!
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def player_params
    params.require(:player).permit(:first_name, :last_name, :birth_year, :points_record, :photo)
  end
end
