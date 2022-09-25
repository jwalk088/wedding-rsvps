module Mutations
  class UpdateRsvpMutation < Mutations::BaseMutation
        argument :id, ID, required: true
        argument :rsvp_attributes,
               Types::RsvpAttributes,
               required: true

      field :rsvp, Types::RsvpType, null: true
      field :errors, [String], null: true

      def resolve(id:, rsvp_attributes:)
        rsvp = Rsvp.find(id) 
        
        unless rsvp.present?
            raise GraphQL::ExecutionError, ["No rsvp found"]
        end
    
        if rsvp.update(rsvp_attributes.to_h)
            {rsvp: rsvp}
        else
            { errors: rsvp.errors.full_messages }
        end

      end
    end
  end