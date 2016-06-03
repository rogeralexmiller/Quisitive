class Api::AnswersController < ApplicationController

  def index
    @answers = Answer.where(question_id: params[:question_id]).includes(:author)
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

    if @answer.update(answer_params)
      render "api/answers/show"
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    if @answer.destroy
      render "api/answers/show"
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def show
    @answer = Answer.find(params[:id])
    render "api/answers/show"
  end


  def answer_params
    params.require(:answer).permit(:body, :question_id)
  end
end
