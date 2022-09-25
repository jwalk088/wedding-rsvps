module Types
  class PlusOneGuestType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :group, Types::GroupType, null: true
    field :guest_id, Integer, null: true
    field :family, Types::FamilyType, null: true
    field :rsvps, [Types::RsvpType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
