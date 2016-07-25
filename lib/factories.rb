

# FactoryGirl.define do
#   factory :category do
#     name Faker::Book.genre
#   end
# end
#
# FactoryGirl.define do
#   factory :article do
#     title Faker::Book.title
#     text Faker::Lorem.paragraph
#     category_id "0"
#   end
# end
#
# FactoryGirl.define do
#   factory :comment do
#     author  Faker::Book.author
#     body Faker::Lorem.paragraph
#     association(:article)
#     article_id "0"
#   end
# end

FactoryGirl.define do
  factory :category do
    name "cat_name"
  end
end

FactoryGirl.define do
  factory :article do
    title "art_title"
    text "art_text"
    category_id "0"
  end
end

FactoryGirl.define do
  factory :comment do
    author "com_author"
    body "com_body"
    article_id "0"
  end
end