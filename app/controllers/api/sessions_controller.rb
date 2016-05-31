class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:email], params[:password])

    if @user
      login(@user)
      render "api/users/show"
    else
      render json: {base:["email and or password incorrect"], status: 401}
    end
  end

  def destroy
		@user = current_user
		if @user
			logout
			render "api/users/show"
		else
			render json: { base: ["Nobody signed in"], status: 404}
		end
	end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end

  end

end
