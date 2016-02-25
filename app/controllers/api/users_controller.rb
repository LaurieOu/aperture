# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    @user.save!
    login_user!(@user)
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end