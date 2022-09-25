class Family < ApplicationRecord
    # belongs_to :guest, class_name: "Guest"
    # belongs_to :member, foreign_key: "member_id", class_name: "Guest"
    has_many :guests
    has_many :plus_one_guests
    has_many :invitations

    accepts_nested_attributes_for :guests
end
