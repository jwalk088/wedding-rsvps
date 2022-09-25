class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.belongs_to :guest, foreign_key: true
      t.string :message

      t.timestamps
    end
  end
end
