class Api::CommentsController < ApplicationController

  before_action :ensure_logged_in

  def index
    id = params[:commentableId]
    type = params[:commentableType].titlecase

    @comments = Comment.where(commentable_id: id).where(commentable_type: type).includes(:author)
    render "api/comments/index"
  end

  def create

    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id

    if @comment.save
      render "api/comments/show"
    else
      render json: @comment.errors, status: 422
    end
  end

  def update
    @comment = Comment.find(params[:id])

    if current_user_owns?(@comment) && @comment.update(comment_params)
      render "api/comments/show"
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if current_user_owns?(@comment) && @comment.destroy
      render "api/comments/show"
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def show
    @comment = Comment.find(params[:id])
    render "api/comments/show"
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type)
  end

end
