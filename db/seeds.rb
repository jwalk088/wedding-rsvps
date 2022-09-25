require 'csv'

Event.create!([
    {
        name: 'Wedding',
        date: DateTime.parse("05/06/2022 17:00"),
        location: "Venue",
        has_menu: true
    },
    {
        name: 'Bridal Shower',
        date: DateTime.parse("15/05/2022 15:00") ,
        location: "Bride's Parents house",
        has_menu: false

    }
])

Age.create!([
    {
        id: 1,
        name: "Adult"
    },
    {
        id: 2,
        name: "Child"
    },
    {
        id: 3,
        name: "Baby"
    }
])

Menu.create(
  [
    {
      id: 1,
      title: "Beef",
      description: "Dry aged 6 oz reserve beef tenderloin, with smokey mashed potatoes, market vegetables & a red wine jus. (gluten free)",
      event_id: 1,
      age_ids: [1]
    },
    {
        id: 2,
        title: "Salmon",
        description: "Seared organic salmon served with a maple-orange beurre blac, market vegetables & creamy artichoke risoot. (gluten free)",
        event_id: 1,
        age_ids: [1]
    },
    {
        id: 3,
        title: "Cannelloni",
        description: "Vegan aubergine cannelloni. (vegan, gluten free)",
        event_id: 1,
        age_ids: [1]
    },
    {
        id: 4,
        title: "Chicken Fries",
        description: "Chicken tenders, fresh cut fries & seasonal veggies.",
        event_id: 1,
        age_ids: [2]
    },
  ]
)

Group.create!([
    {
        id: 1,
        name: "Wedding Party"
    },
    {
        id: 2,
        name: "Jessica's Family"
    },
    {
        id: 3,
        name: "Jessica's Friends"
    },
    {
        id: 4,
        name: "Marks's Family"
    },
    {
        id: 5,
        name: "Marks's Friends"
    },
])

Family.create!([
    {}
])

Guest.create!([
    {
        first_name: "Jessica",
        last_name: "Walker",
        email: "j@email.com",
        group_id: 1,
        age_id: 1,
        allowed_plus_one: false,
        family_id: 1
    },
    {
        first_name: "Mark",
        last_name: "Mroz",
        email: "m@email.com",
        group_id: 1,
        age_id: 1,
        allowed_plus_one: false,
        family_id: 1,
    },
])

CSV.read('db/data/guests.csv').each do |family_row|
    next if family_row.compact.empty? || family_row.first.nil? || family_row.first == "TYPE"
    family_type, names, last_name, group, plus_one = family_row
    group_id = Group.find_by(name: group).id
    plus_one = plus_one == 'YES' ? true : false

    guests_in_family = names.split(',').map { |name| 
        name = name.strip
        age_id = if name.include?("(c)")
            cleaned_name = name.gsub("(c)", '')
            name = name.gsub("(c)", '')
            2
        elsif name.include?("(b)")
            cleaned_name = name.gsub("(b)", '')
            name = name.gsub("(b)", '')
            3
        else
            cleaned_name = name
            1
        end

        if last_name.nil?
            cleaned_name = name.split(' ')[0]
            last_name = name.split(' ')[1...].join(' ')
        end

        { first_name: cleaned_name.strip, last_name: last_name.strip , group_id: group_id, age_id: age_id, allowed_plus_one: plus_one}
    }
    Family.create(guests_attributes: guests_in_family)
end

Invitation.create(Family.all.map {|family| {family_id: family.id, event_id: 1}})