class ArticlesController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @articles = Article.all
    @categories = Category.all
  end

  def show
    @article = Article.find(params[:id])
    @categories = Category.all
    @user = User.find(@article.user_id)
  end

  def new
    # @article = Article.new
    @categories = Category.all
    # render json:@categories
  end

  def edit
    @article = Article.find(params[:id])
    # puts @article.as_json
    # return @article.as_json
    puts @article.as_json
    render json:@article
  end

  def create
    @article = Article.new(article_params)
    puts ('start')
    @article.user_id = current_user.id
    if @article.save
      puts ('ok')
      # puts json: {status: 200, message: 'Success create'}
      render json: {id: @article.id}
    else
      puts('error')
      render 'new'
    end
  end

  # def create
  #   @article = Article.new(article_params)
  #   puts '-------------------'
  #   puts params.as_json
  #   puts @article.as_json
  #   @article.save
  #   redirect_to @article
  # end

  def update
    @article = Article.find(params[:id])
    @articles = Article.all

    if @article.update(article_params)
      render json: {status: 200, message: 'Success update'}
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    #
    # redirect_to articles_path
  end

  private
    def article_params
      params.permit(:id, :title, :text, :category_id, :user_id)
    end
end
