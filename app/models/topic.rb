class Topic < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :topic_taggings

  has_many(
    :questions,
    through: :topic_taggings,
    source: :question
  )
end
