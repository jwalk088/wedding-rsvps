module Types
  class MutationType < Types::BaseObject
    # # TODO: remove me
    # field :test_field, String, null: false,
    #   description: "An example field added by the generator"
    # def test_field
    #   "Hello World"
    # end

    field :add_menu, mutation: Mutations::MenuMutation

    field :add_guest, mutation: Mutations::NewGuestMutation
    
    field :update_guest, mutation: Mutations::UpdateGuestMutation

    field :destroy_guest, mutation: Mutations::DestroyGuestMutation

    field :add_rsvp, mutation: Mutations::NewRsvpMutation

    field :add_rsvp_bulk, mutation: Mutations::NewRsvpBulkMutation

    field :update_rsvp, mutation: Mutations::UpdateRsvpMutation

    field :add_invitation, mutation: Mutations::NewInvitationMutation

    field :add_plus_one, mutation: Mutations::NewPlusOneMutation

    field :sign_in, mutation: Mutations::SignInMutation

    field :sign_out, mutation: Mutations::SignOutMutation

    field :add_comment, mutation: Mutations::NewCommentMutation

    field :update_email_bulk, mutation: Mutations::UpdateEmailBulkMutation
  end
end
