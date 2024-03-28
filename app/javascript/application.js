// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "@popperjs/core"
import "bootstrap"
import "./quizz"
import "./quizz_easy"

const buttonHere = document.querySelector('.bout');
const response = document.querySelector('#player-input')

document.getElementById('player-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') { // Vérifie si la touche pressée est "Entrée"
      event.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée" (par exemple, saut de ligne)
      document.getElementById('check-button').click(); // Déclenche le clic sur le bouton "Vérifier"
  }
});

buttonHere.addEventListener('click', () => {
  const userAnswer = response.value.toLowerCase();
  console.log(userAnswer);
 })
