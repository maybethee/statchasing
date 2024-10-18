class ApplicationController < ActionController::Base
  def after_sign_in_path_for(_resource)
    'https://statchasing.fly.dev/admin'
  end
end
