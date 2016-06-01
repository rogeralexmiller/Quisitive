class Api::QuestionsController < ApplicationController

  def create
    @question = Question.new(question_params)

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
      render json: @contact
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end


  def question_params
    params.require(:question).permit(:body, :author_id)
  end

end
