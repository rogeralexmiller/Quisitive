class Topic < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  validates :author_id, presence: true

  has_many :topic_taggings

  has_many(
    :questions,
    through: :topic_taggings,
    source: :question
  )

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )
end
