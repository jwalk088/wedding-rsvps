class CreateGuests < ActiveRecord::Migration[6.1]
  def change
    create_table :guests do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.belongs_to :family, foreign_key: true, null: true
      t.belongs_to :group, foreign_key: true, null: true
      t.belongs_to :age, foreign_key: true, null: true
      t.boolean :allowed_plus_one
      t.boolean :bringing_plus_one, null: true

      t.timestamps
    end
  end
end
