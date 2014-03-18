class DoodadsController < ApplicationController
  def index
    @doodads = Doodad.all.limit(10).offset(offset).order(order)

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

  def order
    return nil unless params[:orderProperty].present?

    "#{params[:orderProperty]} #{params[:orderDirection]}"
  end

end
