class AddMenuToAges < ActiveRecord::Migration[6.1]
  def change
    add_column :menus, :age_ids, :integer, array: true, default: []
  end
end
