class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

    if @user
      login(@user)
      render "api/users/show"
    else
      render json: {base:["email and or password incorrect"], status: 401}, status: 401
    end
  end

  def twitter_create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    login(@user)
    redirect_to '/'
  end

  def destroy
		@user = current_user
		if @user
			logout
			render "api/users/show"
		else
			render json: { base: ["Nobody signed in"], status: 404}, status: 404
		end
	end

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: ["Could not find current user"]
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end

end
