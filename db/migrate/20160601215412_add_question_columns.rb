class AddQuestionColumns < ActiveRecord::Migration
  def change
    add_column(:questions, :created_at, :datetime)
    add_column(:questions, :updated_at, :datetime)
    add_column(:questions, :author_id, :integer, null: false)
    add_column(:questions, :body, :string, null: false)
    add_index :questions, :author_id
  end
end
