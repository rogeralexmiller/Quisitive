class AddAuthorToTopics < ActiveRecord::Migration
  def change
    add_column :topics, :author_id, :integer, null: false
  end
end
