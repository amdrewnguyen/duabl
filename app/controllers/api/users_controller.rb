class Api::UsersController < ApplicationController
  before_action :require_logged_in, only: %i(index)

  def index
    if params[:search].blank?
      render json: ["Query can't be blank"], status: 422
    else
      @users = User.all.where('UPPER(name) LIKE UPPER(?) OR UPPER(email) LIKE UPPER(?)',
                              "%#{params[:search]}%",
                              "%#{params[:search]}%")
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = current_user

    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name, :image)
  end
end
