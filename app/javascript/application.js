// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "@popperjs/core"
import "bootstrap"
import "./quizz"
import "./quizz_easy"

document.getElementById('player-input').addEventListener('keypress', function(event) {
  if (event.which === 13) { // Vérifie si la touche pressée est "Entrée"
      event.preventDefault();
      document.getElementById('myForm').submit(); 
  }
});
