AngularServerTable::Application.routes.draw do
  root to: 'doodads#index'
  resources :doodads, only: [:index]
end
