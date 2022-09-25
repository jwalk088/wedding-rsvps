module Types
    class GuestsByEventType < Types::BaseObject
      field :guests, [Types::GuestType], null: true
      field :plus_one_guests, [Types::PlusOneGuestType], null: true
    end
  end
  