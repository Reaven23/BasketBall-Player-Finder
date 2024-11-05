module ApplicationHelper
  def start_game_path_for(game)
    case game.level
    when 'easy'
      start_easy_game_path
    when 'medium'
      start_medium_game_path
    when 'hard'
      start_hard_game_path
    when 'legend'
      start_legend_game_path
    end
  end
end
