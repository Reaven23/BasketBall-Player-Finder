class CreateLevels < ActiveRecord::Migration[7.0]
  def change
    create_table :levels do |t|
      t.integer :number
      t.integer :points

      t.timestamps
    end
  end
end
