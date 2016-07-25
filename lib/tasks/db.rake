require 'factory_girl_rails'
FactoryGirl.find_definitions
require 'faker'

namespace :db do
  desc "reset and fill database"
  task fill_db: :environment do
    Rake::Task['db:reset'].invoke
    require Rails.root.join('lib/factories.rb')
    10.times do |cat|
      count = 1 + rand(5)
      category = FactoryGirl.create(:category, {:name => Faker::Book.genre})
      count.times do |art|
        article = FactoryGirl.create(:article, {:title => Faker::Book.title, :text => Faker::Lorem.paragraph, :category_id => category.id})
        2.times do
          FactoryGirl.create(:comment, {:author => Faker::Book.author, :body => Faker::Lorem.paragraph, :article_id => article.id})
        end
      end

    end
  end

  # desc "TODO"
  # task task_2: :environment do
  # end

end
