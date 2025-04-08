class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  attr_accessor :selected_avatar

  has_many :games, dependent: :destroy
  belongs_to :level
  has_one_attached :photo
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  after_commit :attach_selected_avatar, on: [:create, :update]
  after_initialize :set_available_games, if: :new_record?
  before_validation :assign_default_points_level, on: :create

  private

  def attach_selected_avatar
    if selected_avatar.present? && !photo.attached?
      avatar_path = Rails.root.join("public/avatars/#{selected_avatar}.webp")
      photo.attach(io: File.open(avatar_path), filename: "#{selected_avatar}.webp", content_type: 'image/webp')
    end
  end

  def set_available_games
    self.available_games ||= 2
  end

  def assign_default_points_level
    self.level = Level.find_by(number: 1)
    self.points = 0
  end
end
