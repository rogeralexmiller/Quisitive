json.array! @follows do |follow|
  json.followable_id follow.followable_id
  json.followable_type follow.followable_type
  json.id follow.id
end
