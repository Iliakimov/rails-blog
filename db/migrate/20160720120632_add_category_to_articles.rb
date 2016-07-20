class AddCategoryRefToArticles < ActiveRecord::Migration[5.0]
  def up
    add_reference :articles, :category, index: true, foreign_key: true
  end

  def down
    remove_reference :articles, :category
  end
end
