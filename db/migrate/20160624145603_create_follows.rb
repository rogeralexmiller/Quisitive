class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.timestamps
      t.integer :follower_id, null: false
      t.integer :followable_id, null: false
      t.string :followable_type, null: false
    end
    add_index :follows, :follower_id
    add_index :follows, :followable_id
    add_index :follows, :followable_type
  end
end
