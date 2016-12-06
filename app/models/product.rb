class Product < ApplicationRecord
  has_many :meal_products
  has_many :meals, through: :meal_products
end
