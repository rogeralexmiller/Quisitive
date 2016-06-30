class Api::AnswersController < ApplicationController

  before_action :ensure_logged_in

  def index
    @answers = Answer.order('created_at DESC').includes(:author, :comments).where(question_id: params[:question_id])
    render "api/answers/index"
  end

  def create
    @answer = Answer.new(answer_params)
    @answer.author_id = current_user.id

    if @answer.save
      render "api/answers/show"
    else
      render json: @answer.errors, status: 422
    end
  end

  def update
    @answer = Answer.find(params[:id])

    if current_user_owns?(@answer) && @answer.update(answer_params)
      render "api/answers/show"
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    if current_user_owns?(@answer) && @answer.destroy
      render "api/answers/show"
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def show
    @answer = Answer.includes(:author, :comments).find(params[:id])
    render "api/answers/show"
  end

  private
  def answer_params
    params.require(:answer).permit(:body, :question_id)
  end

end
