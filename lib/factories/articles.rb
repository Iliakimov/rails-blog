FactoryGirl.define do
  factory :article do
    title "art_title"
    text "art_text"
    association(:category)
  end
end
