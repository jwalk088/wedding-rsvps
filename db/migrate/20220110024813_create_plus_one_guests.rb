class CreatePlusOneGuests < ActiveRecord::Migration[6.1]
  def change
    create_table :plus_one_guests do |t|
      t.string :first_name
      t.string :last_name
      t.belongs_to :guest, foreign_key: true, null: true
      t.belongs_to :group, foreign_key: true, null: true
      t.belongs_to :family, foreign_key: true, null: true

      t.timestamps
    end
  end
end
