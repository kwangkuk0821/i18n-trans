require 'json'
require 'fileutils'

class TransController < ApplicationController
  def index
  end

  def get_data
    yml_file = YAML::load(File.open("locales/#{I18n.locale}.yml"))
    render :json => yml_file
  end

  def save_data
    puts I18n.locale
    jsonData = JSON.parse(params[:data].to_json)
    ymlData = jsonData.to_yaml
    old_file = File.open("locales/#{I18n.locale}.yml",'r');

    #Make Backup File
    FileUtils.mkdir_p(File.dirname("locales/#{I18n.locale}_backup/#{I18n.locale}#{Time.new.to_s}.yml"))
    FileUtils.cp("locales/#{I18n.locale}.yml","locales/#{I18n.locale}_backup/#{I18n.locale}#{Time.new.to_s}.yml")
    
    #modified translation File
    File.open( "locales/#{I18n.locale}.yml", "w") do |f|
      f.write(ymlData)
    end

    render :text => "ok"
  end
end
