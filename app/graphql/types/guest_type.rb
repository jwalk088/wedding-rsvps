module Types
  class GuestType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :email, String, null: true
    field :email_hidden, String, null: true
    field :group, Types::GroupType, null: true
    field :age, Types::AgeType, null: true
    field :allowed_plus_one, Boolean, null: true
    field :bringing_plus_one, Boolean, null: true
    field :plus_one_guest, Types::PlusOneGuestType, null: true
    field :members, [Types::GuestType], null: true
    field :family, Types::FamilyType, null: true
    field :rsvps, [Types::RsvpType], null: true
    field :invitations, [Types::InvitationType], null: true
    field :all_invitations, [Types::InvitationType], null: true

    def email_hidden 
      if object.email.present? 
        return object.email.chars.first + "*****" + object.email.match(/@(.*)/)[0]
      end
      return nil
    end

    def members
      unless object.family.nil?
        return object.family.guests.select{|guest| guest.id != object.id}
      end
      []
    end

    def all_invitations
      return object.find_invitations
    end
  end
end
