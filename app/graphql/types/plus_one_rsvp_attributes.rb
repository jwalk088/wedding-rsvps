# frozen_string_literal: true
module Types
    class PlusOneRsvpAttributes < Types::BaseInputObject # :nodoc:
      description 'Attributes for creating or updating a plus one rsvp'
      argument :id, ID, required: false
      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :guest_id, ID, required: true
    end
  end
  