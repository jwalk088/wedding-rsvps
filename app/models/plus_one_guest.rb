class PlusOneGuest < ApplicationRecord
    belongs_to :guest, optional: true
    belongs_to :group, optional: true
    belongs_to :family, optional: true

    has_many :rsvps, :as => :person, dependent: :destroy

    validate :check_guest_exists
    validate :can_bring_plus_one
    before_save :make_family

    def check_guest_exists
        errors.add({errors: "Main guest was not found"}) if guest.nil?
    end

    def can_bring_plus_one
        errors.add({errors: "Main guest not allowed plus one"}) unless guest.allowed_plus_one
    end

    def make_family
        main_family = 
            if guest.family_id != nil 
                guest.family
            else
                new_family = Family.create
                guest.update({family_id: new_family.id})
                new_family
            end
        self.family = main_family
    end
end
