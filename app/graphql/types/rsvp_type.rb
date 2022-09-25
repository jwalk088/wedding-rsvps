module Types
  class RsvpType < Types::BaseObject
    field :id, ID, null: true
    field :going, Boolean, null: true
    field :comment, String, null: true
    field :person, Types::PersonType, null: true
    field :event, Types::EventType, null: true
    field :menu, Types::MenuType, null: true
    field :diet, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
