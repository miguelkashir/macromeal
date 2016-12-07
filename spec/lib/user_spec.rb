require 'spec_helper'

RSpec.describe User do
  describe '.calculate_mb' do
    it 'returns basal metabolism' do
      expect(@user.calculate_mb()).to be_numeric
    end
  end
end

# work in progress ruben is hardly needed Kappa
