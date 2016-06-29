Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :follows, only: [:create, :destroy, :index]
    resources :questions, only: [:create, :destroy, :update, :index, :show] do
      get "search", on: :collection
      resources :answers, only: [:index, :create]
      resources :comments, only: [:index, :create]
    end
    resources :answers, only: [:show, :update, :destroy] do
      resources :comments, only: [:index, :create]
    end
    resources :comments, only: [:show, :update, :destroy]
    resources :topics, only: [:index, :show, :destroy, :update] do
      get "search", on: :collection
      get "question_topics", on: :collection
      patch "update_question_topics", on: :collection
    end
  end

  get 'auth/:provider/callback', to: 'api/sessions#twitter_create'

  root to: "static_pages#root"
end
