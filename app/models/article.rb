class Article < ApplicationRecord
  validates :title, presence: true,
            length: { minimum: 5 };
  validates :title, presence: true,
            length: { minimum: 5 }
end