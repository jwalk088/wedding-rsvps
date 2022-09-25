module Types
  class FamilyType < Types::BaseObject
    field :id, ID, null: false
    field :guests, [Types::GuestType], null: true
    field :invitations, [Types::InvitationType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
