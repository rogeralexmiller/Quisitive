class Api::QuestionsController < ApplicationController

  def index
    @questions = Question.all.includes(:author)
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

    if @question.update(question_params)
      render "api/questions/show"
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @question = Question.find(params[:id])
    if @question.destroy
      render "api/questions/show"
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def show
    @question = Question.find(params[:id])
    render "api/questions/show"
  end


  def question_params
    params.require(:question).permit(:body)
  end

end
