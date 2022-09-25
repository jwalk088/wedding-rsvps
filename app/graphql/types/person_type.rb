module Types
    class PersonType < Types::BaseUnion
        description "Properties of Person"
    
        possible_types Types::GuestType,
            Types::PlusOneGuestType
    
        def self.resolve_type(object, context)
            if object.is_a?(Guest)
                Types::GuestType
            elsif object.is_a?(PlusOneGuest)
                Types::PlusOneGuestType
            end
        end
    end
end