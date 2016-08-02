class CommentsController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.new(comment_params)
    @comment.user_id = current_user.id
    @comment.author = current_user.name
    @comment.save
    NewCommentMailer.new_comment(@comment,@article).deliver_now

    redirect_to article_path(@article)
  end


  # def destroy
  #   @article = Article.find(params[:article_id])
  #   @comment = @article.comments.find(params[:id])
  #   @comment.destroy
  #   redirect_to article_path(@article)
  # end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
    @comment.destroy
    # redirect_to article_path(@article)
  end

  private
  def comment_params
    params.require(:comment).permit(:author, :user_id, :body)
  end
end
