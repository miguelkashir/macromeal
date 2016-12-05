class Product < ApplicationRecord
  has_many :productmeals
  has_many :meals, through: :productmeals
end
