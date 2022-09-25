class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.string :location
      t.string :has_menu

      t.timestamps
    end
  end
end
