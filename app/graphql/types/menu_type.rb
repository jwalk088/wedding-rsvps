module Types
  class MenuType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :description, String, null: true
    field :event, EventType, null: false

    field :ages, [AgeType], null: true
  end
end
