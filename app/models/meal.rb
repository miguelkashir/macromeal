class Meal < ApplicationRecord
  has_many :order_meals
  has_many :meals, through: :order_meals
  has_many :meal_products
  has_many :products, through: :meal_products
end
