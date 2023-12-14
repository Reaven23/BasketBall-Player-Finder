const imagePlayer = document.getElementById('photo-joueur');
const response = document.querySelector('#user-answer');
const buttonHere = document.querySelector('.bout')
const answer = document.querySelector(".answer")

let currentQuestion = 0;
let score = 0

const displayQuestion = (data) => {
  imagePlayer.src = data[currentQuestion].photo

  buttonHere.addEventListener('click', () => {
    const userAnswer = response.value.toLowerCase();
    const correctAnswer = data[currentQuestion].first_name.toLowerCase() + data[currentQuestion].last_name.toLowerCase();
    console.log(correctAnswer);
    console.log(currentQuestion);

    if (userAnswer === correctAnswer) {
      answer.innerText = "Bien joué";
      score += 10;
    } else {
      answer.innerText = "T'es nul! Essaie encore";
    }


    if (currentQuestion < data.length - 1) {
      currentQuestion++;
      imagePlayer.src = data[currentQuestion].photo;
      response.value = '';

      setTimeout(() => {
        answer.innerText = '';
      }, 1500);
    } else {
      console.log('Score final :', score);
      answer.innerText = `Score final : ${score}`;
      buttonHere.classList.add('d-none');
      document.querySelector(".response").classList.add("d-none");

    }

  })

}


document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000/players';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayQuestion(data);
    })
  })
