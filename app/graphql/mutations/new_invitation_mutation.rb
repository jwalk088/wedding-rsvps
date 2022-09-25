module Mutations
    class NewInvitationMutation < Mutations::BaseMutation
        argument :invitation_attributes, Types::InvitationAttributes, required: true

        field :invitation, Types::InvitationType, null: true
        field :errors, [String], null: true

        def resolve(invitation_attributes:)
            invitation = Invitation.new(invitation_attributes.to_h)
        
            if invitation.save
                return { invitation: invitation }
            else
                { errors: invitation.errors.full_messages }
            end

        end
    end
end