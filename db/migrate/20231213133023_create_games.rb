class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :name
      t.integer :score
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
