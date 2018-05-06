class AddColumnsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string
    add_column :users, :address, :string
    add_column :users, :cp, :integer
    add_column :users, :city, :string
    add_column :users, :country, :string
    add_column :users, :phone, :integer
    add_column :users, :sex, :integer
    add_column :users, :age, :integer
    add_column :users, :height, :integer
    add_column :users, :weight, :integer
    add_column :users, :activity, :integer
    add_column :users, :calories, :integer
    add_column :users, :protein, :integer
    add_column :users, :fat, :integer
    add_column :users, :carbs, :integer
  end
end
