Player.destroy_all
puts "all players deleted"

Player.create(
  first_name: 'Stephen',
  last_name: 'Curry',
  birth_year: '1988',
  level: 'easy',
  points_record: 62,
  point_average: 24.8,
  photo: 'https://cdn.vox-cdn.com/thumbor/d-VbPgKOGrCCoFoqUwa1jtYSmq4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24350573/1245617942.jpg'
)

Player.create(
  first_name: 'Kobe',
  last_name: 'Bryant',
  birth_year: '1978',
  level: 'easy',
  points_record: 81,
  point_average: 25,
  photo: 'https://cdn-s-www.ledauphine.com/images/83F11F9A-6D4A-4192-85C6-5468661C28A4/NW_detail/kobe-bryant-emmanuel-dunand-afp-1580073977.jpg'
)

Player.create(
  first_name: 'Michael',
  last_name: 'Jordan',
  birth_year: '1963',
  level: 'easy',
  points_record: 69,
  point_average: 30.1,
  photo: 'https://www.basketsession.com/statics/uploads/2020/04/michael-jordan-bulls-rookie.jpg'
)


Player.create(
  first_name: 'Victor',
  last_name: 'Wembanyama',
  birth_year: '2004',
  level: 'easy',
  points_record: 38,
  point_average: 20.7,
  photo: 'https://img.20mn.fr/H-wdNsDMR4K834ZlpwgfSik/722x460_c-est-lui-le-titulaire-a-l-euro'
)

Player.create(
  first_name: 'Lebron',
  last_name: 'James',
  birth_year: '1984',
  level: 'easy',
  points_record: 61,
  point_average: 27.1,
  photo: 'https://img-4.linternaute.com/2LvXSzwn6ZjNkdRcTx2m792_Cx4=/1500x/smart/78273c08efdd4279b9e5a6429c0947d5/ccmcms-linternaute/41695733.jpg'
)

Player.create(
  first_name: 'Luka',
  last_name: 'Doncic',
  birth_year: '1963',
  level: 'easy',
  points_record: 73,
  point_average: 28.6,
  photo: 'https://www.si.com/.image/t_share/MjA0ODgzMzIwMTg0NTE0MTQy/usatsi_22718988_168394021_lowres.jpg'
)

Player.create(
  first_name: 'Joel',
  last_name: 'Embiid',
  birth_year: '1994',
  level: 'easy',
  points_record: 70,
  point_average: 27.8,
  photo: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/iiard8hyncpjfemongcu'
)

Player.create(
  first_name: 'Giannis',
  last_name: 'Antetokounmpo',
  birth_year: '1994',
  level: 'easy',
  points_record: 64,
  point_average: 23.3,
  photo: 'https://s.yimg.com/ny/api/res/1.2/vpCSheKwr4gVlBwVW8d5vQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://s.yimg.com/os/creatr-uploaded-images/2024-03/601d0c40-e47f-11ee-9fdc-928c50cbcbaa'
)

Player.create(
  first_name: 'Nikola',
  last_name: 'Jokic',
  birth_year: '1995',
  level: 'easy',
  points_record: 50,
  point_average: 20.8,
  photo: 'https://prod-media.beinsports.com/image/1705928403358_e7ae22eb-d091-41a8-b4f6-2d52c040795d.jpg'
)

Player.create(
  first_name: 'Kevin',
  last_name: 'Durant',
  birth_year: '1988',
  level: 'easy',
  points_record: 55,
  point_average: 27.3,
  photo: 'https://www.basketusa.com/wp-content/uploads/2024/03/kevin-durant.jpg'
)

PHOTO = {
  1 => "app/assets/images/avatars/avatar_1.webp",
  2 => "app/assets/images/avatars/avatar_2.webp",
  3 => "app/assets/images/avatars/avatar_3.webp",
  4 => "app/assets/images/avatars/avatar_4.webp",
  5 => "app/assets/images/avatars/avatar_5.webp",
  6 => "app/assets/images/avatars/avatar_6.webp",
  7 => "app/assets/images/avatars/avatar_7.webp",
  8 => "app/assets/images/avatars/avatar_8.webp",
  9 => "app/assets/images/avatars/avatar_9.webp",
  10 => "app/assets/images/avatars/avatar_10.webp",
}

puts "10 nba easy Players created"
puts "creating 10 USERS"
User.destroy_all

user1 = User.create!(
  email: "ad.regis@gmail.com",
  points: 4,
  password: "adrien",
  nickname: "Jordan45"
)
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user1.photo.attach(io: File.open(avatar_path), filename: "random avatar")



user2 = User.create(
  email: "yesitis@gmail.com",
  points: 234,
  password: "adrien",
  nickname: "Alex78"
  )

avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user2.photo.attach(io: File.open(avatar_path), filename: "random avatar")

user3 = User.create(
  email: "johnisthenewcadillac@gmail.com",
  points: 2345,
  password: "adrien",
  nickname: "JuvisyBasketClub"
  )
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user3.photo.attach(io: File.open(avatar_path), filename: "random avatar")


user4 = User.create(
  email: "rockit@gmail.com",
  points: 23,
  password: "adrien",
  nickname: "Ad.andforward"
  )
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user4.photo.attach(io: File.open(avatar_path), filename: "random avatar")

user5 = User.create(
  email: "jumpcityjump@gmail.com",
  points: 234,
  password: "adrien",
  nickname: "Oeil de Lynx"
  )
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user5.photo.attach(io: File.open(avatar_path), filename: "random avatar")

user6 = User.create(
  email: "douchee@gmail.com",
  points: 543,
  password: "adrien",
  nickname: "MemesMaster77"
  )
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user6.photo.attach(io: File.open(avatar_path), filename: "random avatar")

user7 = User.create(
  email: "baag@gmail.com",
  points: 654,
  password: "adrien",
  nickname: "PointsTrimmer"
  )
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user7.photo.attach(io: File.open(avatar_path), filename: "random avatar")

user8 = User.create(
  email: "nomoreidea@gmail.com",
  points: 435,
  password: "adrien",
  nickname: "Kobe24"
  )
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user8.photo.attach(io: File.open(avatar_path), filename: "random avatar")

user9 = User.create(
  email: "thereyougo@gmail.com",
  points: 7658,
  password: "adrien",
  nickname: "tHE EDGE wALKER"
  )
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user9.photo.attach(io: File.open(avatar_path), filename: "random avatar")

user10 = User.create(
  email: "roger@gmail.com",
  points: 435,
  password: "adrien",
  nickname: "You see me, now you don't"
)
avatar_path = Rails.root.join(PHOTO[rand(1..2)])
user10.photo.attach(io: File.open(avatar_path), filename: "random avatar")

puts "10 USERS created"
