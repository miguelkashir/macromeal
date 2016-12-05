class CreateMealProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :meal_products do |t|
      t.integer :meal_id
      t.integer :product_id
      t.integer :amount
      t.float :price
      t.timestamps
    end
  end
end
