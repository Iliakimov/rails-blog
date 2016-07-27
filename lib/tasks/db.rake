require 'factory_girl_rails'
FactoryGirl.find_definitions
require 'faker'

namespace :db do
  desc "reset and fill database"
  task fill_db: :environment do
    Rake::Task['db:reset'].invoke
    require Rails.root.join('lib/factories.rb')
    user = FactoryGirl.create(:user)
    10.times do |cat|
      count = 1 + rand(5)
      category = FactoryGirl.create(:category, {:name => Faker::Book.genre})
      count.times do |art|
        article = FactoryGirl.create(:article, {:title => Faker::Book.title, :text => Faker::Lorem.paragraph, :category_id => category.id, :user_id => user.id})
        2.times do
          FactoryGirl.create(:comment, {:author => Faker::Book.author, :body => Faker::Lorem.paragraph, :article_id => article.id, :user_id => user.id})
        end
      end

    end
  end

  desc "delete old article from category"
  task clean_db: :environment do
    # categories_length = Category.all.length
    # categories_length.times do |c|
    #   cat_index = c + 1
    #   articles_id = Article.where(category_id: cat_index.to_s).order("updated_at desc").limit(5).pluck(:id)
    #   articles = Article.where(category_id: cat_index.to_s)
    #   articles.where.not(id: articles_id).destroy_all
    # end

      Category.all.find_each do |c|
        articles_id = c.articles.order(updated_at: :desc).limit(5).pluck(:id)
        c.articles.where.not(id: articles_id).destroy_all
      end
  end

end