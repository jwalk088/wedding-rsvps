module Mutations
    class NewCommentMutation < Mutations::BaseMutation
        argument :comment_attributes, Types::CommentAttributes, required: true

        field :comment, Types::CommentType, null: true
        field :errors, [String], null: true

        def resolve(comment_attributes:)
            comment = Comment.new(comment_attributes.to_h)
        
            if comment.save
                return { comment: comment }
            else
                { errors: comment.errors.full_messages }
            end

        end
    end
end