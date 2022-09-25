# frozen_string_literal: true
module Types
    class GuestAttributes < Types::BaseInputObject # :nodoc:
      description 'Attributes for creating or updating a guest'

      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :email, String, required: false
      argument :group_id, ID, required: false
      argument :age_id, ID, required: false
      argument :allowed_plus_one, Boolean, required: false
    end
  end
  