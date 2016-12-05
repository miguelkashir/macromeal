class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.string :category
      t.string :img
      t.integer :calories
      t.integer :protein
      t.integer :fat
      t.integer :carbs
      t.float :price

      t.timestamps
    end
  end
end
