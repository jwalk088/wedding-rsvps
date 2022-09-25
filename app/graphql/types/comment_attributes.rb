# frozen_string_literal: true
module Types
    class CommentAttributes < Types::BaseInputObject # :nodoc:
      description 'Attributes for creating a comment'

      argument :guest_id, ID, required: false
      argument :message, String, required: false
    end
  end
  