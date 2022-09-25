module Types
    class TotalsType < Types::BaseObject
      field :total_rsvps_count, Integer, null: true
      field :not_going, Integer, null: true
      field :going, Integer, null: true
      field :adult_count, Integer, null: true
      field :child_count, Integer, null: true
      field :wedding_party, Integer, null: true
      field :jess_family, Integer, null: true
      field :jess_friends, Integer, null: true
      field :mark_family, Integer, null: true
      field :mark_friends, Integer, null: true
      field :salmon_meal, Integer, null: true
      field :beef_meal, Integer, null: true
      field :veg_meal, Integer, null: true
      field :kids_meal, Integer, null: true
      field :plus_one_not_going, Integer, null: true
    end
  end
  