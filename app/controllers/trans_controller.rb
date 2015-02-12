require 'json'
require 'fileutils'

class TransController < ApplicationController
  def index
  end

  def get_data_en
    yml_file = YAML::load(File.open("locales/en.yml"))
    render :json => yml_file
  end

  def save_data_en
    jsonData = JSON.parse(params[:data].to_json)
    ymlData = jsonData.to_yaml
    old_file = File.open('locales/en.yml','r');

    #Make Backup File
    FileUtils.cp('locales/en.yml',"locales/en_backup/en#{Time.new.to_s}.yml")
    
    #modified translation File
    File.open( 'locales/en.yml', "w") do |f|
      f.write(ymlData)
    end
    render :text => "ok"
  end
end
