class DoodadsController < ApplicationController
  def index
    @doodads = Doodad.all.limit(10).offset(offset)

    respond_to do |format|
      format.html
      format.json { render json: { 
        doodads: @doodads,
        total: Doodad.count
      } }
    end
  end

  private

  def offset
    page = params[:page]
    10 * (page ? Integer(page) - 1 : 0)
  end
end
