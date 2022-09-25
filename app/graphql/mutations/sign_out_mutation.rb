module Mutations
    class SignOutMutation < Mutations::BaseMutation
        field :success, Boolean, null: true

        def resolve
            context[:session][:sign_in] = nil
            {
                success: true
            }
        end
    end
end