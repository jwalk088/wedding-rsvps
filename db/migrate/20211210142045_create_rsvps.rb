class CreateRsvps < ActiveRecord::Migration[6.1]
  def change
    create_table :rsvps do |t|
      t.boolean :going
      t.string :comment
      t.string :diet
      t.references :person, polymorphic: true
      t.belongs_to :event, foreign_key: true, null: true
      t.belongs_to :menu, foreign_key: true, null: true

      t.timestamps
    end
  end
end
