module Mutations
    class UpdateGuestMutation < Mutations::BaseMutation
        argument :id, ID, required: true
        argument :related_guest_id, ID, required: false
        argument :clear_related_guest, Boolean, required: false
        argument :guest_attributes,
               Types::GuestAttributes,
               required: true

      field :guest, Types::GuestType, null: true
      field :errors, [String], null: true

      def resolve(id:, guest_attributes:, related_guest_id:nil, clear_related_guest:false)
        guest = Guest.find(id) 
        
        unless guest.present?
            raise GraphQL::ExecutionError, ["No guest found"]
        end
    
        if guest.update(guest_attributes.to_h)
            if related_guest_id != nil && clear_related_guest != true
                related = Guest.where(:id => related_guest_id).first
                if related.family !=nil
                    guest.family_id = related.family.id
                    guest.save
                else 
                    family = Family.create()
                    guest.family_id = family.id
                    related.family_id = family.id
                    related.save
                    guest.save
                end  
            end

            if clear_related_guest == true
                guest.update(family: nil)
            end
            {guest: guest}
        else
            { errors: guest.errors.full_messages }
        end

      end
    end
  end