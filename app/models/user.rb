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

  # Fórmula de Harris-Benedict:
  # http://www.vitonica.com/dietas/calcula-tu-dieta-paso-a-paso-calcular-necesidades-caloricas-i

  # MB Hombre:
  # 66,473 +
  # (13,751 x peso en kg) +
  # (5,0033 x estatura en cm) -
  # (6,7550 x edad en años)

  # MB Mujer:
  # 655,1 +
  # (9,463 x peso en kg) +
  # (1,8 x estatura en cm) -
  # (4,6756 x edad en años)

  #Sedentario (poco o nada ejercicio):
  # MB x 1,2
  # Levemente activo (ejercicios livianos, deporte 1-3 veces por semana):
  # MB x1.375
  # Moderadamente activo (ejercicio moderado, deporte 3-5 veces por semana):
  # MB x 1,55
  # Muy activo (ejercicios intensos, deporte 6-7 días por semana):
  # MB x 1,725
  # Hiperactivo (ejercicios muy intensos, trabajo físico, 2h diarias o más de deporte):
  # MB x 1.9
end
