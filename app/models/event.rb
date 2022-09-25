class Event < ApplicationRecord
    has_many :menus
    has_many :rsvps
    has_many :invitations
end
