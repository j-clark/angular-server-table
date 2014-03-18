require 'spec_helper'

describe DoodadsController do

  describe '#index' do
    let(:doodads) { double(:doodads) }

    before do
      allow(Doodad).to receive(:all).and_return(doodads)
      get :index
    end

    it 'renders all doodads as json' do
      expect(response.body).to eq({ doodads: doodads }.to_json)
    end
  end
end
