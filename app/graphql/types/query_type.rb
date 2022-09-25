module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :is_signed_in, Types::SignInType, null: false, description: "Returns true if the use is signed in"

    def is_signed_in
      context[:session][:sign_in].nil? == false
      return {signed_in: context[:session][:sign_in].nil? == false, is_admin: context[:session][:sign_in] == "admin"}
    end

    field :menus, [Types::MenuType], null: false, description: "Returns the menu options"

    def menus
      Menu.all
    end

    field :ages, [Types::AgeType], null: false, description: "Returns the age options"

    def ages
      Age.all
    end

    field :groups, [Types::GroupType], null: false, description: "Returns the group options"

    def groups
      Group.all
    end

    field :guests, [Types::GuestType], null: false, description: "All of the guests"

    def guests
      Guest.all.order(id: :asc)
    end

    field :find_guest_by_name, [Types::GuestType], null: false do
      description "Find a guest by first and last name"
      argument :first_name, String, required: true
      argument :last_name, String, required: true
    end

    def find_guest_by_name(first_name:, last_name:)
      Guest.find_by_name(first_name: first_name, last_name: last_name)
    end

    field :events, [Types::EventType], null: false, description: "All of the events"

    def events
      Event.all
    end

    field :event, Types::EventType, null: false do 
      description "An event"
      argument :id, ID, required: true
    end

    def event(id:)
      Event.find(id)
    end

    field :rsvps, [Types::RsvpType], null: false, description: "All of the RSVPs"

    def rsvps
      Rsvp.all
    end

    field :invitations, [Types::InvitationType], null: false, description: "All of the Invitations"

    def invitations
      Invitation.all
    end

    field :guests_by_event, Types::GuestsByEventType, null: false do
       description "Invitations for guests by event"
       argument :event_id, ID, required: true
       argument :guest_id, ID, required: true
    end
   
    def guests_by_event(event_id:, guest_id:)
      Guest.get_guests_for_event(event_id: event_id, guest_id: guest_id)
    end

    field :comments, [Types::MessageType], null: false, description: "All comments"

    def comments
      Comment.all.order(created_at: :asc)
    end

    field :totals, Types::TotalsType, null: false, description: "Rsvp totals"

    def totals
      Rsvp.get_totals
    end

    field :total_rsvps_count, Integer, null: false, description: "All rsvps including pending responses"

    def total_rsvps_count
      Guest.count {|guest| guest.allowed_plus_one == true} + Guest.count
    end
  end
end
