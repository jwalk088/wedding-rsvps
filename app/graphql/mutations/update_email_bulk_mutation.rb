module Mutations
    class UpdateEmailBulkMutation < Mutations::BaseMutation
        argument :email_attributes, [Types::EmailAttributes], required: true
        field :guests, [Types::GuestType], null: true
        field :errors, [String], null: true

        def resolve(email_attributes: [])
            success_guests = []
            errors = []

            email_attributes.each do |e_a|
                guest = Guest.find(e_a[:guest_id]) unless e_a[:guest_id].nil? 

                if guest.nil? 
                    errors.push({errors: 'No guest found with provided id'})
                else
                    guest.update({email: e_a.email})
    
                    error_messages = guest.errors.full_messages
                    if error_messages.empty? 
                        success_guests.push(guest)
                    else
                        errors.push({errors: error_messages})
                    end
                end
            end

            return {guests: success_guests, errors: errors}
        end
    end
end