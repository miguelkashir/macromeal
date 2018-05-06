class CreateOrderMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :order_meals do |t|
      t.integer :order_id
      t.integer :meal_id
      t.timestamps
    end
  end
end
