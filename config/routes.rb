Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resources :projects, only: %i(index show create update destroy) do
      resources :tasks, only: %i(index)
    end
    resources :tasks, only: %i(index show create update destroy)
    resource :session, only: %i(create destroy)
  end
  root "static_pages#root"
end
