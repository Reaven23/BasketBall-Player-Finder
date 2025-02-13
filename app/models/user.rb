class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  attr_accessor :selected_avatar

  has_many :games, dependent: :destroy
  has_one_attached :photo
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         :omniauthable, omniauth_providers: [:google_oauth2]
  after_commit :attach_selected_avatar, on: [:create, :update]
  after_initialize :set_available_games, if: :new_record?

  private

  def attach_selected_avatar
    if selected_avatar.present? && !photo.attached?
      avatar_path = Rails.root.join("app/assets/images/avatars/#{selected_avatar}.webp")
      photo.attach(io: File.open(avatar_path), filename: "#{selected_avatar}.webp", content_type: 'image/webp')
    end
  end

  def set_available_games
    self.available_games ||= 5
  end
end
