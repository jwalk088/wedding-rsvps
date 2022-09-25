# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_01_013018) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ages", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "guest_id"
    t.string "message"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guest_id"], name: "index_comments_on_guest_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.datetime "date"
    t.string "location"
    t.string "has_menu"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "families", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "guests", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.bigint "family_id"
    t.bigint "group_id"
    t.bigint "age_id"
    t.boolean "allowed_plus_one"
    t.boolean "bringing_plus_one"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["age_id"], name: "index_guests_on_age_id"
    t.index ["family_id"], name: "index_guests_on_family_id"
    t.index ["group_id"], name: "index_guests_on_group_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "guest_id"
    t.bigint "family_id"
    t.boolean "sent"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_invitations_on_event_id"
    t.index ["family_id"], name: "index_invitations_on_family_id"
    t.index ["guest_id"], name: "index_invitations_on_guest_id"
  end

  create_table "menus", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.bigint "event_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "age_ids", default: [], array: true
    t.index ["event_id"], name: "index_menus_on_event_id"
  end

  create_table "plus_one_guests", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.bigint "guest_id"
    t.bigint "group_id"
    t.bigint "family_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["family_id"], name: "index_plus_one_guests_on_family_id"
    t.index ["group_id"], name: "index_plus_one_guests_on_group_id"
    t.index ["guest_id"], name: "index_plus_one_guests_on_guest_id"
  end

  create_table "rsvps", force: :cascade do |t|
    t.boolean "going"
    t.string "comment"
    t.string "diet"
    t.string "person_type"
    t.bigint "person_id"
    t.bigint "event_id"
    t.bigint "menu_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id", "person_id", "person_type"], name: "index_rsvps_on_event_id_and_person_id_and_person_type", unique: true
    t.index ["event_id"], name: "index_rsvps_on_event_id"
    t.index ["menu_id"], name: "index_rsvps_on_menu_id"
    t.index ["person_type", "person_id"], name: "index_rsvps_on_person"
  end

  add_foreign_key "comments", "guests"
  add_foreign_key "guests", "ages"
  add_foreign_key "guests", "families"
  add_foreign_key "guests", "groups"
  add_foreign_key "invitations", "events"
  add_foreign_key "invitations", "families"
  add_foreign_key "invitations", "guests"
  add_foreign_key "menus", "events"
  add_foreign_key "plus_one_guests", "families"
  add_foreign_key "plus_one_guests", "groups"
  add_foreign_key "plus_one_guests", "guests"
  add_foreign_key "rsvps", "events"
  add_foreign_key "rsvps", "menus"
end
