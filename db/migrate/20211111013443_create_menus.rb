class CreateMenus < ActiveRecord::Migration[6.1]
  def change
    create_table :menus do |t|
      t.string :title
      t.text :description
      t.belongs_to :event, foreign_key: true, null: false

      t.timestamps
    end
  end
end
