class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def edit
    @article = Article.find(params[:id])
  end

  def create
    @article = Article.new(article_params)
    puts '-------------------'
      puts params.as_json
      puts @article.as_json
    if @article.save
      redirect_to @article
    else
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

    if @article.update(article_params)
      render json: {status: 200, message: 'Success update'}
      redirect_to @article
    else
      render 'edit'
    end
  end

  private
    def article_params
      params.permit(:title, :text)
    end
end
