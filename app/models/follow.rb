class Follow < ActiveRecord::Base

  validates :follower_id, :followable_id, :followable_type, presence: true

  validates_uniqueness_of :follower_id, :scope => :followable_id

  belongs_to(:follower,
  class_name: "User",
  foreign_key: :follower_id,
  primary_key: :id
  )

  belongs_to :followable, polymorphic: true
end
