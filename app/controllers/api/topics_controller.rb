class Api::TopicsController < ApplicationController
  before_action :ensure_logged_in

  def index
    followed_topic_ids = current_user.followings.where(followable_type: "Topic").pluck(:followable_id)
    @topics = Topic.includes(:questions, :author).where(id: followed_topic_ids)
    render "api/topics/index"
  end

  def show
    @topic = Topic.includes(:questions, :author, :followers).find(params[:id])
    render "api/topics/show"
  end

  def create
    @topic = Topic.new(name: topic_params[:name])
    if @topic.save
      render "api/topics/show"
    else
      render json: @topic.errors, status: 422
    end
  end

  def update
    @topic = Topic.find(params[:id])

    if current_user_owns?(@topic) && @topic.update(topic_params)
      render "api/topics/show"
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @topic = Topic.find(params[:id])
    if current_user_owns?(@topic) && @topic.destroy
      render "api/topics/show"
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  def question_topics
    @question = Question.includes(:topics).find(params[:question_id])
    @topics = @question.topics
    render "api/topics/index"
  end

  def update_question_topics
    @question = Question.includes(:topics).find(params[:question_id])
    topic_errors = []
    if current_user_owns?(@question)
      @question.topics.destroy_all
      topics = params[:topics] ? params[:topics] : []
      topics.each do |idx, topic|
        if idx == "newTopics"
          topic_errors = handle_new_topics(topic, @question)
        else
          TopicTagging.create(question_id: @question.id, topic_id:idx)
        end
      end
      updated_question = Question.includes(:topics).find(params[:question_id])
      @topics = updated_question.topics
      render "api/topics/index"
    else
      render json: ["Can't update topics at this time", topic_errors]
    end
  end

  def search
    if params[:query].present?
      @topics = Topic.where("name ~ ?", params[:query])
    else
      @topics = Topic.none
    end

    render "api/topics/index"
  end

  private
  def topic_params
    params.require(:topic).permit(:name)
  end

  def handle_new_topics(topics, question)
    topic_errors = []
    topics.each do |new_topic|

      t = Topic.new(name: new_topic, author_id: current_user.id)
      if t.save
        TopicTagging.create(question_id: question.id, topic_id: t.id)
      else
        topic_errors = [t.errors.full_messages, status: :unprocessable_entity]
      end
    end
    topic_errors
  end

end
