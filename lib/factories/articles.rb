FactoryGirl.define do
  factory :article do
    title "art_title"
    text "art_text"
    association(:category)
    association(:user)
  end
end
