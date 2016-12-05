class Order < ApplicationRecord
  belongs_to :user
  has_many :ordermeals
  has_many :meals, through: :ordermeals
end
