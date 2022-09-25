class Menu < ApplicationRecord
    belongs_to :event, optional: false
    has_many :rsvps

    attribute :age_ids, :integer, array: true

    def ages
        Age.where(id: age_ids)
    end
end
