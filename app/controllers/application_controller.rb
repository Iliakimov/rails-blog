class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def after_sign_in_path_for(resource)
    articles_path
  end

  def after_sign_out_path_for(resource_or_scope)
    request.referrer
  end

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    added_attrs = [:name, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

end