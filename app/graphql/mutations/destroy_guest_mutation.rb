module Mutations
    class DestroyGuestMutation < Mutations::BaseMutation
        argument :id, ID, required: true

        field :guest, Types::GuestType, null: true
        field :errors, [String], null: true

        def resolve(id:)
            guest = Guest.find(id) 
        
            unless guest.present?
                raise GraphQL::ExecutionError, ["No guest found"]
            end
    
            if guest.destroy
                {
                  guest: guest
                }
            else
                { errors: guest.errors.full_messages }
            end
        end
    end
end