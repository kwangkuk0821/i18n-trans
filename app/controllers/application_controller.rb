class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_locale

  def set_locale
    puts I18n.available_locales
    if params[:locale].blank?
      I18n.locale = extract_locale_from_accept_language_header
    elsif I18n.available_locales.include? params[:locale].to_sym
      I18n.locale = params[:locale]
    else
      I18n.locale = I18n.default_locale
    end
  end

  def extract_locale_from_accept_language_header
    browser_locale = request.env['HTTP_ACCEPT_LANGUAGE'].try(:scan, /^[a-z]{2}/).try(:first).try(:to_sym) 
    if I18n.available_locales.include? browser_locale
      browser_locale
    else
      I18n.default_locale
    end
  end

end
