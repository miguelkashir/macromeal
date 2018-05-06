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

  #calculate basal metabolism using Harris-Benedict formula: https://goo.gl/ZOhTFI
  def calculate_calories
    if sex == 0 #man
      mb = 66.473 + (13.751 * weight) + (5.0033 * height) - (6.7550 * age)
    else #woman
      mb = 655.1 + (9.463 * weight) + (1.8 * height) - (4.6756 * age)
    end

    #calculate activity increment
    if activity == 0 #sedentary
      mb *= 1.2
    elsif activity == 1 #slightly active
      mb *= 1.375
    elsif activity == 2 #moderately active
      mb *= 1.55
    elsif activity == 3 #very active
      mb *= 1.725
    else
      mb *= 1.9 #hiperactive
    end

    mb.to_i #return
  end

  def calculate_protein(cals, protein)
    cals /= 4 #1 prot gr = 4 cals
    (cals * (protein / 100)).to_i
  end

  def calculate_fat(cals, fat)
    cals /= 9 #1 fat gr = 4 cals
    (cals * (fat / 100)).to_i
  end

  def calculate_carbs(cals, carbs)
    cals /= 4 #1 carb gr = 4 cals
    (cals * (carbs / 100)).to_i
  end

end
