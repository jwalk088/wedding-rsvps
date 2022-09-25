module Mutations
    class SignInMutation < Mutations::BaseMutation
        argument :passcode, String, required: true
        # class AuthInput < Types::BaseInputObject # :nodoc:
        #     description 'Attributes for creating or updating a user'
        #     argument :passcode, String, 'Passcode', required: false
        #   end
        # argument :auth, AuthInput, required: false

        field :success, Boolean, null: true
        field :errors, [String], null: true

        def resolve(passcode:)
            # passcode = auth[:passcode]
            sign_in, success = if passcode == ENV['ADMIN_PASSWORD']
                [:admin, true]
            elsif passcode == ENV['GUEST_PASSWORD']
                [:guest, true]
            else
                [nil, false]
            end

            if success 
                context[:session][:sign_in] = sign_in 
                {
                    success: success
                }
            else
                {
                    success: false,
                    errors: ['Invalid passcode']
                }
            end
        end
    end
end