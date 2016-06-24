# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160624145603) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "author_id",   null: false
    t.string   "body",        null: false
    t.integer  "question_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "answers", ["author_id"], name: "index_answers_on_author_id", using: :btree
  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree
  add_index "answers", ["updated_at"], name: "index_answers_on_updated_at", using: :btree

  create_table "comments", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "author_id",        null: false
    t.string   "body",             null: false
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree
  add_index "comments", ["updated_at"], name: "index_comments_on_updated_at", using: :btree

  create_table "follows", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "follower_id",     null: false
    t.integer  "followable_id",   null: false
    t.string   "followable_type", null: false
  end

  add_index "follows", ["followable_id"], name: "index_follows_on_followable_id", using: :btree
  add_index "follows", ["followable_type"], name: "index_follows_on_followable_type", using: :btree
  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.string   "body",       null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "questions", ["author_id"], name: "index_questions_on_author_id", using: :btree
  add_index "questions", ["updated_at"], name: "index_questions_on_updated_at", using: :btree

  create_table "topic_taggings", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "question_id", null: false
    t.integer  "topic_id",    null: false
  end

  add_index "topic_taggings", ["question_id", "topic_id"], name: "index_topic_taggings_on_question_id_and_topic_id", unique: true, using: :btree

  create_table "topics", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",       null: false
    t.integer  "author_id",  null: false
  end

  add_index "topics", ["name"], name: "index_topics_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "full_name",       null: false
    t.string   "email"
    t.string   "password_digest"
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "twitter_uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
