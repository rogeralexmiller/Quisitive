class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.timestamps
      t.string :name, null: false
    end
    add_index :topics, :name, unique: true
  end
end
