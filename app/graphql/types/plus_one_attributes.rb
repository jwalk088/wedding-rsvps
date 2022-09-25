# frozen_string_literal: true
module Types
    class PlusOneAttributes < Types::BaseInputObject # :nodoc:
      description 'Attributes for creating or updating a plus one guest'

      argument :guest_id, ID, required: false
      argument :firstName, String, required: false
      argument :lastName, String, required: false
    end
  end
  