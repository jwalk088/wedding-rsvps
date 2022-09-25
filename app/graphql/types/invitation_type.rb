module Types
  class InvitationType < Types::BaseObject
    field :id, ID, null: false
    field :event, Types::EventType, null: true
    field :family, Types::FamilyType, null: true
    field :guest, Types::GuestType, null: true
    field :sent, Boolean, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
