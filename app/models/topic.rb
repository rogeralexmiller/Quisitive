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

  has_many(:follows, as: :followable)

  has_many(:followers,
  through: :follows,
  source: :follower
  )

end
