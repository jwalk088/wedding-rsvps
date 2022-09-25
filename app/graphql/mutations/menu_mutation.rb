module Mutations
    class MenuMutation < Mutations::BaseMutation
      argument :title, String, required: true
      argument :description, String, required: false
      argument :event_id, ID, required: true
  
      field :event, Types::EventType, null: false
      field :menu, Types::MenuType, null: true
      field :errors, [String], null: true

      def resolve(title:, description:nil, event_id:)
        event = Event.find(event_id)
        menu = Menu.new(
            title: title,
            description: description,
            event: event
            )

      if menu.save
        { menu: menu }
      else
        { errors: menu.errors.full_messages }
      end

      end
    end
  end