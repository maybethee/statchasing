class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def check_admin
    if current_user&.admin?
      render json: { is_admin: true }, status: :ok
    else
      render json: { is_admin: false }, status: :ok
    end
  end

  private

  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    headers['Access-Control-Allow-Credentials'] = 'true'
  end

  def options
    head :ok
  end
end
