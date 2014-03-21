class DoodadsController < ApplicationController
  def index
    @doodads = Doodad.all.limit(10).offset(offset).order(order)

    respond_to do |format|
      format.html
      format.json do
        render json: {
          doodads: @doodads,
          total: doodad_count,
          links: {
            nextPage: page < page_count ? path_for_page(page + 1) : nil,
            prevPage: page > 1 ? path_for_page(page - 1) : nil,
            pages: 1.upto(page_count).map { |page_num| { num: page_num, href: path_for_page(page_num)} }
          }
        }
      end
    end
  end

  private

  def offset
    per_page * (page - 1)
  end

  def order
    return nil unless params[:orderProperty].present?

    "#{params[:orderProperty]} #{params[:orderDirection]}"
  end

  def page
    params[:page].to_i || 1
  end

  def page_count
    (doodad_count / per_page.to_f).ceil
  end

  def per_page
    10
  end

  def doodad_count
    @doodad_count ||= Doodad.count
  end

  def path_for_page(page_num)
    doodads_path(params.merge(page: page_num))
  end
end
