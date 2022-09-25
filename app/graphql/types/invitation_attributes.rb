# frozen_string_literal: true
module Types
    class InvitationAttributes < Types::BaseInputObject # :nodoc:
      description 'Attributes for creating or updating an invitation'

      argument :event_id, ID, required: false
      argument :family_id, ID, required: false
      argument :guest_id, ID, required: false
      argument :sent, Boolean, required: false
    end
  end
  