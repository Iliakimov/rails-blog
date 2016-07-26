class NewCommentMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def new_comment(comment, article)
    @comment = comment
    @article = article
    mail(to: "dekoyre@bk.ru", subject: 'Test')
  end
end
