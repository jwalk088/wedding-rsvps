class Invitation < ApplicationRecord
    belongs_to :event, optional: false
    belongs_to :family, optional: true
    belongs_to :guest, optional: true

    def self.get_invitation(guest_id:, event_id:)
        invitation_guest = Invitation.find_by(event_id: event_id, guest_id: guest_id)
        if invitation_guest != nil
            invitation_guest
        else 
            guest = Guest.find_by(id: guest_id)
            if guest != nil
                invitation_family = Invitation.find_by(event_id: event_id, family_id: guest.family_id) unless guest.family_id.nil?
                if invitation_family != nil
                    invitation_family
                end 
            end
        end
    end
end
