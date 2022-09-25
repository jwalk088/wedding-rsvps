module Mutations
    class NewRsvpMutation < Mutations::BaseMutation
        argument :rsvp_attributes, Types::RsvpAttributes, required: true

        field :rsvp, Types::RsvpType, null: true
        field :errors, [String], null: true

        def resolve(rsvp_attributes:)
            rsvp = Rsvp.new(rsvp_attributes.to_h)
        
        if rsvp.save
            return { rsvp: rsvp }
        else
            { errors: rsvp.errors.full_messages }
        end

        end
    end
  end