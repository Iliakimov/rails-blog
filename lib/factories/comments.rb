FactoryGirl.define do
  factory :comment do
    author "com_auth"
    body "com_body"
    association(:article)
    association(:user)
  end
end