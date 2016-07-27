

class Article < ApplicationRecord
  belongs_to :category
  has_many :comments, dependent: :destroy
  validates :title, presence: true,
            length: { minimum: 5 };
  validates :text, presence: true,
            length: { minimum: 5 }
end