class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  attr_accessor :selected_avatar

  has_many :games
  has_one_attached :photo
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  after_commit :attach_selected_avatar, on: [:create, :update]

  private

  def attach_selected_avatar
    p "hello je suis dans attach machin"
    if selected_avatar.present? && !photo.attached?
      avatar_path = Rails.root.join("app/assets/images/avatars/#{selected_avatar}.webp")
      p avatar_path
      photo.attach(io: File.open(avatar_path), filename: "#{selected_avatar}.webp", content_type: 'image/webp')
    end
  end
end
