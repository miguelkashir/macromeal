class MealProduct < ApplicationRecord
  belongs_to :meal
  belongs_to :product
end
