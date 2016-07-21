class RenameCommenterInComments < ActiveRecord::Migration[5.0]
  def up
    rename_column :comments, :commenter, :author
  end

  def down
    rename_column :comments, :author, :commenter
  end
end
