class CreateAges < ActiveRecord::Migration[6.1]
  def change
    create_table :ages do |t|
      t.string :name

      t.timestamps
    end
  end
end
