class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
  	@current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
  	session[:session_token] = user.reset_session_token!
  end

  def logout
    session[:session_token] = nil
    current_user.reset_session_token!
    @current_user = nil
  end

  def ensure_logged_in
    unless current_user
      render json: ["Request requires logged in user"]
    end
  end

  def current_user_owns?(entity)
    current_user.id == entity.author_id ? true : false
  end

end
