class Meal < ApplicationRecord
  has_many :productmeals
  has_many :products, through: :productmeals
  has_many :ordermeals
  has_many :orders, through: :ordermeals
end
