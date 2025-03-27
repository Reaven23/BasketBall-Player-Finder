class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :rankings ]

  def home
  end

  def rankings
    @users_sorted_by_score = User.all.order(Arel.sql('COALESCE(points, 0) DESC'))
  end

  def dashboard
  end

  def contact
  end

  def about
  end


end
