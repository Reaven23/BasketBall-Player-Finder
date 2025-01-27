import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="game"
export default class extends Controller {
  static targets = ["playerImage", "playerInput", "checkButton", "progressGameBar", "questionNumber", "answer", "score", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "returnButton", "timer"];
  static values = { level: String };

  connect() {
    console.log("hello game");
    this.currentQuestion = 0;
    this.score = 0;
    this.players = [];
    this.timeLimit = 14;
    this.timeRemaining = this.timeLimit;
    console.log(this.currentQuestion);
    this.loadGame();
  }

  async loadGame() {
    let apiUrl;
    if (this.levelValue === "easy") {
      apiUrl = `http://localhost:3000/ten_players_easy`;
    } else if (this.levelValue === "medium") {
      apiUrl = `http://localhost:3000/ten_players_medium`;
    } else if (this.levelValue === "hard") {
      apiUrl = `http://localhost:3000/ten_players_hard`;
    } else if (this.levelValue === "legend") {
      apiUrl = `http://localhost:3000/ten_players_legend`;
    }

    const response = await fetch(apiUrl)
    this.players = await response.json();
    this.showNextPlayer();
  }

  showNextPlayer() {
    this.resetTimer();
    if (this.currentQuestion < this.players.length) {
      const player = this.players[this.currentQuestion];
      this.playerImageTarget.src = player.photo;
      this.questionNumberTarget.innerText = `Joueur ${this.currentQuestion + 1}/10`;
      this.playerInputTarget.value = "";
      this.startTimer();
    } else {
      this.endGame();
    }
  }

  startTimer() {
    this.timeRemaining = this.timeLimit;
    this.updateTimerVisual();

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerVisual();

      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.checkAnswer();
      }
    }, 1000);
  }

  resetTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timeRemaining = this.timeLimit;
    this.updateTimerVisual();
  }

  updateTimerVisual() {
    const percentage = (this.timeRemaining / this.timeLimit) * 100;
    this.playerImageTarget.style.border = `8px solid rgba(2244, 152, 5, ${(100 - percentage) / 100})`;

    if (this.hasTimerTarget) {
      this.timerTarget.textContent = `${this.timeRemaining}`;
      this.timerTarget.classList.add('blink');
      setTimeout(() => {
        this.timerTarget.classList.remove('blink');
      }, 500);
    }
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.checkAnswer();
    }
  }

  async checkAnswer() {
    const player = this.players[this.currentQuestion];
    const userAnswer = this.playerInputTarget.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const correctAnswer = `${player.first_name.toLowerCase()}${player.last_name.toLowerCase()}`;

    let pointsValue;
    if (this.levelValue === "easy") {
      pointsValue = 10;
    } else if (this.levelValue === "medium") {
      pointsValue = 30;
    } else if (this.levelValue === "hard") {
      pointsValue = 50;
    } else if (this.levelValue === "legend") {
      pointsValue = 100;
    }

    try {
      const response = await fetch('/test_jaro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector("[name='csrf-token']").content
        },
        body: JSON.stringify({
          correct_answer: correctAnswer,
          user_answer: userAnswer
        })
      });

      const data = await response.json();
      const num = data.jaro_num;

      if (num >= 0.9650) {
        const newScore = this.score + pointsValue;
        this.animateScoreUpdate(newScore);
        this.score = newScore;
        this.updateScoreVisual(true);
      } else {
        this.animateWrongAnswer();
        this.updateScoreVisual(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    const bar = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    this[bar[this.currentQuestion] + "Target"].classList.add('orange');
    this.currentQuestion++;
    this.showNextPlayer();
  }


  updateScoreVisual(correct) {
    if (correct) {
      this.scoreTarget.innerHTML = `${this.score} point${this.score > 0 ? 's' : ''}`
  } else {
      this.scoreTarget.innerHTML = `${this.score} point${this.score > 0 ? 's' : ''}`
    }
  }

  animateScoreUpdate(newScore) {
    const currentScore = parseInt(this.scoreTarget.textContent) || 0;
    const increment = newScore > currentScore ? 1 : -1;

    let currentDisplayedScore = currentScore;

    this.scoreTarget.classList.add('animated');

    const interval = setInterval(() => {
      currentDisplayedScore += increment;
      this.scoreTarget.textContent = `${currentDisplayedScore} point${currentDisplayedScore > 1 ? 's' : ''}`;

      if (currentDisplayedScore === newScore) {
        clearInterval(interval);
        this.scoreTarget.classList.remove('animated');
      }
    }, 50);
  }

  animateWrongAnswer() {
    this.scoreTarget.classList.add('wrong');
    setTimeout(() => {
      this.scoreTarget.classList.remove('wrong');
    }, 600);
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
    modalMessage.textContent = `${this.score} point${this.score > 0 ? 's' : ''}`;
    modal.show();
  }

  endGame() {
    this.playerInputTarget.classList.add('d-none');
    this.postScore()
  }
}
