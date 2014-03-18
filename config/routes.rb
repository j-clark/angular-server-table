AngularServerTable::Application.routes.draw do
  resources :doodads, only: [:index]
end
