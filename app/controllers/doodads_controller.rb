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
            nextPage: page < page_count ? path_but(page: page + 1) : nil,
            prevPage: page > 1 ? path_but(page: page - 1) : nil,
            reorderName: order_property == :name ? path_but(order_desc: !order_desc?) : path_but(order_property: :name, order_desc: false),
            reorderValue: order_property == :value ? path_but(order_desc: !order_desc?) : path_but(order_property: :value, order_desc: false),
            pages: 1.upto(page_count).map { |page_num| { num: page_num, href: path_but(page: page_num)} }
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
    "#{order_property} #{order_desc? ? 'desc' : 'asc'}"
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

  def path_but(exceptions)
    doodads_path(params.merge(exceptions))
  end

  def order_property
    params[:order_property].try(:intern) || :name
  end

  def order_desc?
    params[:order_desc] == 'true'
  end
end
