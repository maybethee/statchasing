Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'check_admin', to: 'users#check_admin'
      post 'players/fetch_replays', to: 'players#fetch_replays'
      post 'players/fetch_old_replays', to: 'players#fetch_old_replays'
    end
  end

  # Custom route
  post 'fetch_replays', to: 'api/v1/players#fetch_replays'
  post 'fetch_old_replays', to: 'api/v1/players#fetch_old_replays'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
