class CreateInvitations < ActiveRecord::Migration[6.1]
  def change
    create_table :invitations do |t|
      t.belongs_to :event, foreign_key: true, null: true
      t.belongs_to :guest, foreign_key: true, null: true
      t.belongs_to :family, foreign_key: true, null: true
      t.boolean :sent

      t.timestamps
    end
  end
end
