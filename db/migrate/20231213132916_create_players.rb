class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.string :first_name
      t.string :last_name
      t.string :birth_year
      t.integer :points_record
      t.float :point_average
      t.string :level
      t.string :photo

      t.timestamps
    end
  end
end
