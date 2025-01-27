# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
## config/schedule.rb

# Utiliser le chemin complet pour les logs
set :output, "log/cron.log"

# Planifier la réinitialisation quotidienne
every 1.day, at: '00:00 am' do
  runner "User.where('available_games < ?', 5).update_all(available_games: 5)"
end


# Learn more: http://github.com/javan/whenever
