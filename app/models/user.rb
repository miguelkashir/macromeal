class User < ApplicationRecord
  has_many :orders
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
  :registerable,
  :recoverable,
  :rememberable,
  :trackable,
  :validatable

  # Harris-Benedict formula: https://goo.gl/ZOhTFI
  def calculate_mb
    #calculate basal metabolism
    if sex == 0
      mb = 66.473 + (13.751 * weight) + (5.0033 * height) - (6.7550 * age)
    else
      mb = 655.1 + (9.463 * weight) + (1.8 * height) - (4.6756 * age)
    end

    #calculate activity increment
    if activity == 0
      mb *= 1.2
    elsif activity == 1
      mb *= 1.375
    elsif activity == 2
      mb *= 1.55
    elsif activity == 3
      mb *= 1.725
    else
      mb *= 1.9
    end

    mb #return
  end
end
