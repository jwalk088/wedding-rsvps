module Types
    class MessageType < Types::BaseObject
      field :id, ID, null: false
      field :guest, Types::GuestType, null: true
      field :message, String, null: true
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    end
  end
  