class TransController < ApplicationController
  def index
  end

  def get_data_en
    yml_file = YAML::load(File.open("lib/locales/en.yml"))
    render :json => yml_file
  end
end
