module Mutations
    class NewGuestMutation < Mutations::BaseMutation
        argument :guest_attributes, Types::GuestAttributes, required: true
        argument :related_guest_id, ID, required: false

        field :guest, Types::GuestType, null: true
        field :errors, [String], null: true

        def resolve(guest_attributes:, related_guest_id:nil)
            guest = Guest.new(guest_attributes.to_h)
        
            unless related_guest_id.nil?
                related = Guest.where(:id => related_guest_id).first
                if related.family !=nil
                    guest.family_id = related.family.id
                else 
                    family = Family.create()
                    guest.family_id = family.id
                    related.family_id = family.id
                    related.save
                end  
            end

        if guest.save
            return { guest: guest }
        else
            { errors: guest.errors.full_messages }
        end

        end
    end
  end