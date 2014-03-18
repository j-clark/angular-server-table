class CreateDoodad < ActiveRecord::Migration
  def change
    create_table :doodads do |t|
      t.string :name
      t.integer :value
    end
  end
end
