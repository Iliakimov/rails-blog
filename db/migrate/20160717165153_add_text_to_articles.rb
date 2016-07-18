class AddTextToArticles < ActiveRecord::Migration[5.0]
  def up
    add_column :articles, :text, :text
  end

  def down
    remove_column :articles, :text
  end
end
