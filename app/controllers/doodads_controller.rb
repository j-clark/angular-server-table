class DoodadsController < ApplicationController
  def index
    @doodads = Doodad.all

    respond_to do |format|
      format.html
      format.json { render json: { doodads: @doodads } }
    end
  end
end
