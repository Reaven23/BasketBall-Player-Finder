import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="game"
export default class extends Controller {
  static targets = ["playerImage", "playerInput", "checkButton", "progressGameBar", "questionNumber", "answer", "scoreVisual", "score", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "returnButton"];

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
      console.log(this.score);
      this.updateScoreVisual(true);
    } else {
      this.updateScoreVisual(false);
    }
    const bar = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    this[bar[this.currentQuestion] + "Target"].classList.add('orange');
    this.currentQuestion++;
    this.showNextPlayer();
  }

  updateScoreVisual(correct) {
    console.log(correct);
    if (correct) {
      this.scoreVisualTarget.innerHTML = `
      <div class="checked">
        <div class="img-container"><img src="/assets/checked.png" alt="" id="image-score" class=""></div>
        <div class="score-message">C'est fort, bravo!</div>
      </div>
    `;
    this.scoreTarget.innerHTML = `${this.score} point${this.score > 0 ? 's' : ''}`
  } else {
    console.log("hello false");
    this.scoreVisualTarget.innerHTML = `
      <div class="crossed">
        <div class="img-container"><img src="/assets/crossed.png" alt="my image" id="image-score" class=""></div>
        <div class="score-message">C'est nul, essaie encore!</div>
      </div>
    `;
      console.log(this.scoreVisualTarget.innerHTML);
      this.scoreTarget.innerHTML = `${this.score} point${this.score > 0 ? 's' : ''}`
    }

    this.scoreVisualTarget.classList.remove('d-none');
  }

  postScore() {
    const url = `/user/update_score`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("[name='csrf-token']").content
      },
      body: JSON.stringify({ points: this.score })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.status === 'success') {
        console.log('Score updated successfully');
      } else {
        console.error('Failed to update score:', data.message);
      }
      this.showEndGameModal();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  showEndGameModal() {
    const endButton = document.querySelector(".return-button")
    endButton.classList.remove("d-none")
    const modal = new bootstrap.Modal(document.getElementById('endGameModal'));
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = `Jeu terminé! Votre score est de ${this.score} point${this.score > 0 ? 's' : ''}`;
    modal.show();
  }

  endGame() {
    this.playerInputTarget.classList.add('d-none');
    this.postScore()
  }
}
