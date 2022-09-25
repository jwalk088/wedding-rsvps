module Types
    class SignInType < Types::BaseObject
      field :signed_in, Boolean, null: false
      field :is_admin, Boolean, null: true
    end
  end
  