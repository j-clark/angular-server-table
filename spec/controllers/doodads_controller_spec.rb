require 'spec_helper'

describe DoodadsController do

  describe '#index' do
    let(:doodads) { double(:doodads) }

    before do
      allow(Doodad).to receive(:all).and_return(doodads)
    end

    describe "rendering json" do
      it 'renders all doodads as json' do
        get :index, format: :json

        expect(response.body).to eq({ doodads: doodads }.to_json)
      end
    end

    it 'assigns all doodads' do
      get :index

      expect(assigns(:doodads)).to eq(doodads)
    end
  end
end
