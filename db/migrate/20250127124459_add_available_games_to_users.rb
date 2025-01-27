class AddAvailableGamesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :available_games, :integer
  end
end
