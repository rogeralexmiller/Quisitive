class Api::TopicsController < ApplicationController
  before_action :ensure_logged_in

  def index
    @topics = Topic.all.includes(:questions, :author)
    render "api/topics/index"
  end

  def show
    @topic = Topic.includes(:questions, :author).find(params[:id])
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
end
