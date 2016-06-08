class CreateTopicTaggings < ActiveRecord::Migration
  def change
    create_table :topic_taggings do |t|
      t.timestamps
      t.integer :question_id, null: false
      t.integer :topic_id, null: false
    end
    add_index :topic_taggings, [:question_id, :topic_id], unique: true
  end
end
