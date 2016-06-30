json.array! @follows do |follow|
  json.followableId follow.followable_id
  json.followableType follow.followable_type
  json.id follow.id
end
