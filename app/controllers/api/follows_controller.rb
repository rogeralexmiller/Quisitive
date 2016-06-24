class FollowsController < AplicationController
  before_action :ensure_logged_in

  def create
    @follow = Follow.new(
      follower_id: current_user.id,
      follower_type: follow_params[:followable_type],
      follower_id: follow_params[:followable_id]
    )
    if @follow.save
      render "api/follows/show"
    else
      render json: @follow.errors,  status: 422
    end
  end

  def destroy
    @follow = Follow.find(:id)
    if @follow.destroy
      render "api/follows/show"
    else
      render json: @follow.errors, status: 422
    end
  end

  private
  def follow_params
    params.require(:follow).permit(:followable_id, :followable_type)
  end

end
