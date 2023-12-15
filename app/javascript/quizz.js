const imagePlayer = document.getElementById('photo-joueur');
const response = document.querySelector('#user-answer');
const buttonHere = document.querySelector('.bout');
const answer = document.querySelector(".answer");

let score = 0;
let currentQuestion = 0;
let timer;

document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000/players';
  console.log(score);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const randomNumbers = [];

      while (randomNumbers.length < 4) {
        const randomNumber = Math.floor(Math.random() * data.length);
        if (!randomNumbers.includes(randomNumber)) {
          randomNumbers.push(randomNumber);
        }
      }

      displayQuestions(data, randomNumbers);
    });
});

const displayQuestions = (data, randomNumbers) => {
  showQuestion(data[randomNumbers[currentQuestion]]);

  buttonHere.addEventListener('click', () => {
    const userAnswer = response.value.toLowerCase();
    const correctAnswer = `${data[randomNumbers[currentQuestion]].first_name.toLowerCase()} ${data[randomNumbers[currentQuestion]].last_name.toLowerCase()}`;

    if (userAnswer === correctAnswer) {
      answer.innerText = "Bien joué";
      score += 10;
    } else {
      answer.innerText = "T'es nul! Essaie encore";
      response.value = '';
    }

    clearTimeout(timer); // Réinitialiser le timer
    nextQuestion(data, randomNumbers);
  });

  // Démarrer le timer de 20 secondes pour chaque question
  timer = setTimeout(() => {
    answer.innerText = '';
    nextQuestion(data, randomNumbers);
  }, 20000);
};

const showQuestion = (player) => {
  imagePlayer.src = player.photo;
};

const nextQuestion = (data, randomNumbers) => {
  currentQuestion++;

  if (currentQuestion < randomNumbers.length) {
    showQuestion(data[randomNumbers[currentQuestion]]);
    response.value = '';
    clearTimeout(timer); // Réinitialiser le timer pour la question suivante
    timer = setTimeout(() => {
      answer.innerText = '';
      nextQuestion(data, randomNumbers);
    }, 20000);
  } else {
    // Afficher le score final une fois toutes les questions posées
    console.log('Score final :', score);
    answer.innerText = `Score final : ${score}`;
    buttonHere.classList.add('d-none');
    response.classList.add('d-none');
  }
};



// const imagePlayer = document.getElementById('photo-joueur');
// const response = document.querySelector('#user-answer');
// const buttonHere = document.querySelector('.bout')
// const answer = document.querySelector(".answer")

// let score = 0

// document.addEventListener('DOMContentLoaded', () => {
//   const url = 'http://localhost:3000/players';

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const randomNumbers = [];
//       while (randomNumbers.length < 4) {
//         const randomNumber = Math.floor(Math.random() * data.length);
//         if (!randomNumbers.includes(randomNumber)) {
//           randomNumbers.push(randomNumber);
//         }
//       }
//       console.log(randomNumbers);
//       displayQuestion(data, randomNumbers);

//     })
//   })


// const displayQuestion = (data, randomNumbers) => {
//   console.log(randomNumbers);
//   randomNumbers.forEach((number) => {
//     imagePlayer.src = data[number].photo

//     buttonHere.addEventListener('click', () => {
//       const userAnswer = response.value.toLowerCase();
//       const correctAnswer = data[number].first_name.toLowerCase() + ' ' + data[number].last_name.toLowerCase();



//       if (userAnswer === correctAnswer) {
//         answer.innerText = "Bien joué";
//         score += 10;
//       } else {
//         answer.innerText = "T'es nul! Essaie encore";
//         response.value = '';
//       }


//     })

//     setTimeout(() => {

//     }, 20000);

//   });

// }
// console.log('Score final :', score);
// answer.innerText = `Score final : ${score}`;
// buttonHere.classList.add('d-none');
// document.querySelector(".response").classList.add("d-none");

// if (currentQuestion < data.length - 1) {
//   currentQuestion++;
//   imagePlayer.src = data[currentQuestion].photo;
//   response.value = '';

//   setTimeout(() => {
//     answer.innerText = '';
//   }, 1500);
// } else {
//   console.log('Score final :', score);
//   answer.innerText = `Score final : ${score}`;
//   buttonHere.classList.add('d-none');
//   document.querySelector(".response").classList.add("d-none");

// }
