Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :questions, only: [:create, :destroy, :update, :index, :show] do
      resources :answers, only: [:index, :create]
      resources :comments, only: [:index, :create]
    end
    resources :answers, only: [:show, :update, :destroy] do
      resources :comments, only: [:index, :create]
    end
    resources :comments, only: [:show, :update, :destroy]
  end

  root to: "static_pages#root"
end
