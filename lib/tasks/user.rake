namespace :user do
  desc "Met à jour les niveaux des utilisateurs selon leurs points"
  task sync_levels: :environment do
    puts "Mise à jour des niveaux utilisateurs..."

    User.find_each do |user|
      p user.points
      p correct_level = Level.where("points >= ?", user.points || 0).order(points: :desc).last
      p correct_level ||= Level.order(:points).first
      p correct_level = Level.find_by(number: correct_level.number + 1) if user.points == correct_level.points



      if user.level != correct_level
        puts "👤 #{user.nickname} (#{user.points} pts) : #{user.level&.number || 'aucun'} ➡️ #{correct_level.number}"
        user.update!(level: correct_level)
      else
        puts "✅ #{user.nickname} est déjà au bon niveau (#{user.level.number})"
      end
    end

    puts "Sync terminée !"
  end
end
