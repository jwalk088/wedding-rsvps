module Types
  class EventType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :date, GraphQL::Types::ISO8601DateTime, null: true
    field :location, String, null: true
    field :has_menu, Boolean, null: true
    field :menus, [Types::MenuType], null: true
    field :rsvps, [Types::RsvpType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
