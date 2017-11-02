@users.each do |user|
  json.set! user.id do
    json.id user.id
    json.email user.email
    json.name user.name
    json.imageUrl user.image.url
    names = user.name.split(" ")
    if names.length > 1
      json.initials names.first[0] + names.last[0]
    else
      json.initials names.first[0..1]
    end
  end
end
