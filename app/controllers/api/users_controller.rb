class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only[:update]

  def create
    @user = User.new(user_params)

    if @user.save
      login @user
      render "api/users/show"
    else
			render json: @user.errors, status: 422
		end
  end

  def update
    @user = User.find(params[:userId])

    if current_user.id == @user.id && @user.update(user_params)
      render "api/users/show"
    else
			render json: @user.errors, status: 422
		end
  end

  private

  def user_params
    params.require(:user).permit(:email, :full_name, :password)
  end

end
