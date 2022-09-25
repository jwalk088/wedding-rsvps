module Mutations
    class NewPlusOneMutation < Mutations::BaseMutation
        argument :plus_one_attributes, Types::PlusOneAttributes, required: true

        field :plus_one_guest, Types::PlusOneGuestType, null: true
        field :errors, [String], null: true

        def resolve(plus_one_attributes:)
            plus_one_guest = PlusOneGuest.new(plus_one_attributes.to_h)
        
        if plus_one_guest.save
            return { plus_one_guest: plus_one_guest }
        else
            { errors: plus_one_guest.errors.full_messages }
        end

        end
    end
  end