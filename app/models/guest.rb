class Guest < ApplicationRecord
    belongs_to :group, optional: true
    belongs_to :age, optional: true
    belongs_to :family, optional: true

    has_many :rsvps, :as => :person, dependent: :destroy
    has_many :invitations
    has_one :plus_one_guest
    has_many :comments

    scope :find_by_name, -> (first_name: "", last_name: "") { 
        where('lower(first_name) LIKE ?', "%#{first_name.downcase}%").where('lower(last_name) LIKE ?', "%#{last_name.downcase}%")
     }

    def find_invitations
        invitations = self.invitations
        family = self.family

        if family != nil
            invitations = invitations + family.invitations
        end
        return invitations
    end

    def self.get_guests_for_event(event_id: "", guest_id: "")
        g = Guest.where(id: guest_id).first
        if g.present?

            # either have a single invitation or a family one 
            single_invitation = Invitation.where(guest_id: guest_id, event_id: event_id).first
            if single_invitation.present?
                # if single, no other guests will be invited to this too, return just this guest
                return [g]
            end
            

            f = g.family
            if f != nil 
                # check if a family invitation exists
                family_invitation = Invitation.where(family_id: g.family.id, event_id: event_id).first
                if family_invitation.present?
                    guests = f.guests
                    plus_one_guests = f.plus_one_guests 
                    
                    # if family invitation, return all members
                    return {guests: guests, plus_one_guests: plus_one_guests}
                end
                # if not, then this guest is not invited to this event 
                return []
            end
            return [g]
        end
        return []
    end

    # def self.find_related(id:)
    #     guest = Guest.find(id)
    #     if guest != nil
    #         if guest.family != nil
    #             family = guest.family
    #             return family.guests
    #         end
    #     end
    #     return [guest]
    # end
end