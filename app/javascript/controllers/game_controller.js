import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="game"
export default class extends Controller {
  static targets = ["playerImage", "playerInput", "checkButton", "progressGameBar", "questionNumber", "answer", "scoreVisual"];

  connect() {
    console.log("hello game");
    this.currentQuestion = 0;
    this.score = 0;
    this.players = [];
    console.log(this.currentQuestion);
    this.loadGame();
  }

  async loadGame() {
    const response = await fetch(`http://localhost:3000/ten_players`);
    this.players = await response.json();
    console.log(this.players);
    this.showNextPlayer();
  }

  showNextPlayer() {
    if (this.currentQuestion < this.players.length) {
      const player = this.players[this.currentQuestion];
      this.playerImageTarget.src = player.photo;
      this.questionNumberTarget.innerText = `Joueur ${this.currentQuestion + 1}/10`;
      this.playerInputTarget.value = "";
    } else {
      this.endGame();
    }
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.checkAnswer();
    }
  }

  checkAnswer() {
    const player = this.players[this.currentQuestion];
    const userAnswer = this.playerInputTarget.value.trim().toLowerCase();
    const correctAnswer = `${player.first_name.toLowerCase()} ${player.last_name.toLowerCase()}`;

    if (userAnswer === correctAnswer) {
      this.score += 10;
      this.updateScoreVisual(true);
    } else {
      this.updateScoreVisual(false);
    }

    this.currentQuestion++;
    this.showNextPlayer();
  }

  updateScoreVisual(correct) {
    if (correct) {
      this.scoreVisualTarget.innerHTML = `
        <div class="checked d-flex flex-column align-items-center justify-content-center">
          <div class="img-container"><img src="<%= asset_path('checked.png') %>" alt="" id="image" class=""></div>
          <div class="score-message">C'est fort, bravo!</div>
        </div>
      `;
    } else {
      this.scoreVisualTarget.innerHTML = `
        <div class="crossed visual d-flex flex-column align-items-center justify-content-center">
          <div class="img-container"><img src="<%= asset_path('crossed.png') %>" alt="" id="image" class=""></div>
          <div class="score-message">C'est nul, essaie encore!</div>
        </div>
      `;
    }
    this.scoreVisualTarget.classList.remove('d-none');
  }

  endGame() {
    alert(`Jeu terminé! Votre score est de ${this.score}`);
    this.checkButtonTarget.classList.add('d-none');
    this.playerInputTarget.classList.add('d-none');
  }


}
