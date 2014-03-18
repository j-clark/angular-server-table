100.times do
  Doodad.create(
    name: Faker::Name.name,
    value: Random.rand(500)
  )
end
