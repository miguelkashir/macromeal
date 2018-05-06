require 'rails_helper'

describe User do

  before(:each) do
    @user = User.create(sex:  0, age: 25, height: 192, weight: 106, activity: 0)
  end

  it 'calculate calories function returns something' do
    expect(@user.calculate_calories).not_to be_nil
  end

  it 'calculate calories function returns an integer' do
    expect(@user.calculate_calories).to be_a(Integer)
  end

  it 'calculate calories function does not returns a float' do
    expect(@user.calculate_calories).not_to be_a(Float)
  end

  it 'calculate calories function does not returns a string' do
    expect(@user.calculate_calories).not_to be_a(String)
  end

  it 'calculate protein function returns something' do
    expect(@user.calculate_protein(2000, 200)).not_to be_nil
  end

  it 'calculate protein function returns an integer' do
    expect(@user.calculate_protein(2000, 200)).to be_a(Integer)
  end

  it 'calculate protein function does not returns a float' do
    expect(@user.calculate_protein(2000, 200)).not_to be_a(Float)
  end

  it 'calculate protein function does not returns a string' do
    expect(@user.calculate_protein(2000, 200)).not_to be_a(String)
  end

  it 'calculate fat function returns something' do
    expect(@user.calculate_fat(2000, 200)).not_to be_nil
  end

  it 'calculate fat function returns an integer' do
    expect(@user.calculate_fat(2000, 200)).to be_a(Integer)
  end

  it 'calculate fat function does not returns a float' do
    expect(@user.calculate_fat(2000, 200)).not_to be_a(Float)
  end

  it 'calculate fat function does not returns a string' do
    expect(@user.calculate_fat(2000, 200)).not_to be_a(String)
  end

  it 'calculate carbs function returns something' do
    expect(@user.calculate_carbs(2000, 200)).not_to be_nil
  end

  it 'calculate carbs function returns an integer' do
    expect(@user.calculate_carbs(2000, 200)).to be_a(Integer)
  end

  it 'calculate carbs function does not returns a float' do
    expect(@user.calculate_carbs(2000, 200)).not_to be_a(Float)
  end

  it 'calculate carbs function does not returns a string' do
    expect(@user.calculate_carbs(2000, 200)).not_to be_a(String)
  end

end
