module Mutations
    class NewRsvpBulkMutation < Mutations::BaseMutation
        argument :rsvp_attributes, [Types::RsvpAttributes], required: true
        field :rsvps, [Types::RsvpType], null: true
        field :errors, [String], null: true

        def resolve(rsvp_attributes:, plus_one_rsvp_attributes: [])
            success_rsvps = []
            errors = []

            rsvp_attributes.each do |r_a|
                rsvp = r_a[:id].nil? ? Rsvp.new(r_a.to_h) : Rsvp.find(r_a[:id])
                if rsvp.persisted?
                    rsvp.update(r_a.to_h)
                else
                    rsvp.save
                end

                error_messages = rsvp.errors.full_messages
                if error_messages.empty? 
                    success_rsvps.push(rsvp)
                else
                    errors.push({errors: error_messages})
                end
            end

            return {rsvps: success_rsvps, errors: errors}
        end

                # if r_a.id 
                #     # existing 
                #     if rsvp_update = Rsvp.update(r_a.id, r_a.to_h)
                #         rsvp.push(rsvp_update)
                #     else
                #         errors.push({ errors: rsvp_update.errors.full_messages })
                # else 
                #     # create
                #     rsvp_new = Rsvp.new(r_a.to_h)
                #     if rsvp_new.save 
                #         rsvp.push(rsvp_new)
                #     else
                #         errors.push({ errors: rsvp_new.errors.full_messages })
                #     end
                # end
           



            # add check that they are invited

        #     rsvp_attributes.each do |r_a|
        #         if existing = Rsvp.find_by(person_id: r_a.person_id, event_id: r_a.event_id, person_type: "Guest")
        #             # add error check
        #             rsvp_update = Rsvp.update(existing.id, r_a.to_h.merge({person_type: "Guest"}))
        #             rsvp.push(rsvp_update)
        #         else 
        #             # invitation = Invitation.find_by(event_id: r_a.event_id )

        #             rsvp_new = Rsvp.new(r_a.to_h.merge({person_type: "Guest"}))
        #             if rsvp_new.save 
        #                 rsvp.push(rsvp_new)
        #             else
        #                 errors.push({ errors: rsvp_new.errors.full_messages })
        #             end
        #         end
        #     end




        #     plus_one_rsvp_attributes.each do |p_o_r_a|
        #         main_guest = Guest.find_by(id: p_o_r_a.main_guest_id)
        #         if main_guest == nil 
        #             errors.push({errors: "Main guest not found"})
        #             next
        #         end
                    
        #         plus_one_guest = PlusOneGuest.find_by(guest_id: p_o_r_a.main_guest_id)
        #         existing = 
        #             unless plus_one_guest.nil?
        #                 Rsvp.find_by(person_id: plus_one_guest.id, event_id: p_o_r_a.rsvp_attributes.event_id, person_type: "PlusOneGuest")
        #             else 
        #                 nil
        #             end

        #         if existing != nil && plus_one_guest != nil
        #             if p_o_r_a.first_name != nil
        #                 plus_one_guest.update_attribute(:first_name, p_o_r_a.first_name)
        #             end
        #             if p_o_r_a.last_name != nil
        #                 plus_one_guest.update_attribute(:last_name, p_o_r_a.last_name)
        #             end
        #             rsvp_update = Rsvp.update(existing.id, p_o_r_a.rsvp_attributes.to_h.merge({person_type: "PlusOneGuest"}))
                    
        #             # error check

        #             rsvp.push(rsvp_update)
        #             main_guest.update_attribute(:bringing_plus_one, p_o_r_a.rsvp_attributes.going)
        #         else 
        #             unless main_guest.allowed_plus_one
        #                 errors.push({errors: "Main guest not allowed plus one"})
        #                 next
        #             end
        #             main_family = 
        #                 if main_guest.family_id != nil 
        #                     main_guest.family
        #                 else
        #                     new_family = Family.create
        #                     main_guest.family_id = new_family.id
        #                     new_family
        #                 end

        #                 # if going false - set bringing plus one on main guest and return 

        #             new_guest = PlusOneGuest.new({first_name: p_o_r_a.first_name, last_name: p_o_r_a.last_name, guest_id:  p_o_r_a.main_guest_id, family_id: main_family.id, group_id: main_guest.group.id})
        #             if new_guest.save
        #                 rsvp_new = Rsvp.new(p_o_r_a.rsvp_attributes.to_h.merge({person_id: new_guest.id, person_type: "PlusOneGuest"}))
        #                 if rsvp_new.save 
        #                     main_guest.update_attribute(:bringing_plus_one, true)
        #                     rsvp.push(rsvp_new)
        #                 else
        #                     errors.push({ errors: rsvp_new.errors.full_messages })
        #                 end
        #             else
        #                  errors.push({ errors: new_guest.errors.full_messages })
        #             end
        #         end
                
        #     end

           
        
    end
  end