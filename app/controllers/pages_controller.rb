class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :rankings ]

  def home
  end

  def rankings
    @users_sorted_by_score = User.all.order(points: :desc)
  end

  def contact
  end

  def about
  end


end
