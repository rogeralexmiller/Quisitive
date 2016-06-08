class TopicTagging < ActiveRecord::Base
  validates :topic_id, uniqueness: {scope: :question_id}
  validates :question_id, uniqueness: {scope: :topic_id}

  belongs_to :topic

  belongs_to :question
end
