# frozen_string_literal: true
module Types
    class EmailAttributes < Types::BaseInputObject # :nodoc:
      description 'Attributes for creating or updating a guest email'

      argument :guest_id, ID, required: false
      argument :email, String, required: false
    end
  end
  