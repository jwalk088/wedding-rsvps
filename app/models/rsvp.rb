class Rsvp < ApplicationRecord
    belongs_to :event, optional: false
    belongs_to :person, :polymorphic => true, optional: true
    belongs_to :menu, optional: true

    attribute :guest_id
    attribute :plus_one_attributes
    attribute :bringing_plus_one

    validate :define_guest
    validate :has_invitation

    after_save :update_guest_plus_one_status

    def define_guest
        if person.nil?
            if !guest_id.nil? 
                guest = Guest.find(guest_id)
                self.person = guest
            elsif !plus_one_attributes.nil?
                if !plus_one_attributes[:id].nil?
                    pg = PlusOneGuest.find(plus_one_attributes[:id])
                    pg.update(plus_one_attributes.to_h)
                elsif !plus_one_attributes[:guest_id].nil?
                    main_guest = Guest.find(plus_one_attributes[:guest_id])
                    unless main_guest.plus_one_guest.nil?
                        pg = main_guest.plus_one_guest
                        pg.update(plus_one_attributes.to_h)
                    else 
                        if going == true 
                            pg = PlusOneGuest.new(plus_one_attributes.to_h.merge({group_id: main_guest.group_id}))
                            pg.save
                        else
                            return
                        end
                    end
                else
                    errors.add('person_id', 'no main guest found for plus one')
                end
            
                unless pg.errors.full_messages.empty?
                    errors.concat pg.errors
                    return false 
                end

                self.person = pg
            end
        end
    end

    def has_invitation
        unless person.nil? || person.class.name != 'Guest'
            guest_invite = Invitation.get_invitation(guest_id: person.id, event_id: event.id)
            if guest_invite.nil?
                errors.add('person_id', 'was not invited')
            end 
        end
    end


    def self.get_totals
        going = 0
        not_going = 0
        adult_count = 0
        child_count = 0
        wedding_party = 0
        jess_family = 0
        jess_friends = 0
        mark_family = 0
        mark_friends = 0
        salmon_meal = 0
        beef_meal = 0
        veg_meal = 0
        kids_meal = 0

        Rsvp.all.each do |rsvp|
            if rsvp.going == true 
                going += 1
                if rsvp.person.group_id == 1
                    wedding_party += 1
                elsif rsvp.person.group_id == 2
                    jess_family += 1
                elsif rsvp.person.group_id == 3
                    jess_friends += 1
                elsif rsvp.person.group_id == 4
                    mark_family += 1
                else
                    mark_friends += 1
                end
    
                if rsvp.person.is_a?(Guest)
                    if rsvp.person.age_id == 1
                        adult_count += 1
                    else
                        child_count += 1
                    end
                else 
                    adult_count += 1
                end 

                if rsvp.menu_id == 1
                    beef_meal += 1
                elsif rsvp.menu_id == 2
                    salmon_meal += 1
                elsif rsvp.menu_id == 3
                    veg_meal += 1
                else 
                    kids_meal += 1
                end

            elsif rsvp.going == false && !rsvp.person_id.nil?
                not_going += 1
            end
        end

        return {
            total_rsvps_count: Guest.count {|guest| guest.allowed_plus_one == true} + Guest.count,
            not_going: not_going,
            plus_one_not_going: Guest.count {|guest| guest.allowed_plus_one == true && guest.bringing_plus_one == false},
            going: going,
            adult_count: adult_count,
            child_count: child_count,
            wedding_party: wedding_party,
            jess_family: jess_family,
            jess_friends: jess_friends,
            mark_family: mark_family,
            mark_friends: mark_friends,
            beef_meal: beef_meal,
            salmon_meal: salmon_meal,
            veg_meal: veg_meal,
            kids_meal: kids_meal
        }
    end

    def update_guest_plus_one_status
        if !person.nil? && person.class.name == 'Guest' && !bringing_plus_one.nil? 
           
            person.update({bringing_plus_one: bringing_plus_one})

            if !bringing_plus_one && !person.plus_one_guest.nil?
                PlusOneGuest.destroy(person.plus_one_guest.id)
            end
        elsif !person.nil? && person.class.name == 'PlusOneGuest'
            main_guest = Guest.find(plus_one_attributes[:guest_id])

            main_guest.update({bringing_plus_one: going})
            if going == false
                PlusOneGuest.destroy(person.id)
            end
        elsif plus_one_attributes != nil && going == false
            
            main_guest = Guest.find(plus_one_attributes[:guest_id])
            main_guest.update({bringing_plus_one: false})
        end
    end
end
