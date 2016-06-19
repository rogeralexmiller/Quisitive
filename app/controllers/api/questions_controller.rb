class Api::QuestionsController < ApplicationController

  before_action :ensure_logged_in

  def index
    @questions = Question.order('updated_at DESC').all.includes(:author, :comments, :topics)
    render "api/questions/index"
  end

  def create
    @question = Question.new(question_params)
    @question.author_id = current_user.id

    if @question.save
      render "api/questions/show"
    else
			render json: @question.errors, status: 422
		end
  end

  def update
    @question = Question.find(params[:id])
    if current_user_owns?(@question) && @question.update(question_params)
      render "api/questions/show"
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @question = Question.find(params[:id])
    if current_user_owns?(@question) && @question.destroy
      render "api/questions/show"
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def show
    @question = Question.includes(:author, :comments, :topics).find(params[:id])
    render "api/questions/show"
  end

  def search
    if params[:query].present?
      @questions = Question.where("body ~ ?", params[:query])
    else
      @questions = Question.none
    end

    render "api/questions/index"
  end

  private
  def question_params
    params.require(:question).permit(:body)
  end

end
