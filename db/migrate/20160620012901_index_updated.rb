class IndexUpdated < ActiveRecord::Migration
  def change
    add_index :questions, :updated_at
    add_index :comments, :updated_at
    add_index :answers, :updated_at
  end
end
