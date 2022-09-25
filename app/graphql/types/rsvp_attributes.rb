# frozen_string_literal: true
module Types
    class RsvpAttributes < Types::BaseInputObject # :nodoc:
      description 'Attributes for creating or updating an rsvp'
      argument :going, Boolean, required: false
      argument :id, ID, required: false
      argument :comment, String, required: false
      argument :diet, String, required: false
      argument :guest_id, ID, required: false
      argument :event_id, ID, required: false
      argument :menu_id, ID, required: false
      argument :plus_one_attributes, Types::PlusOneRsvpAttributes, required: false
    end
  end
  