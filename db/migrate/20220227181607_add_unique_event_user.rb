class AddUniqueEventUser < ActiveRecord::Migration[6.1]
  def change
    add_index :rsvps, [:event_id, :person_id, :person_type], unique: true
  end
end
