class CategoriesController < ApplicationController

  def index
    @categories = Category.all
  end

  def show
    @categories = Category.all
    @category = Category.find(params[:id])
    @articles = Article.where("category_id = ?", @category.id).order(updated_at: :asc)
  end
end
