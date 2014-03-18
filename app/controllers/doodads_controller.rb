class DoodadsController < ApplicationController
  def index
    render json: { doodads: Doodad.all }
  end
end
