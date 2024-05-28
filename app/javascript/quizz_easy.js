

// const question = document.querySelector('.question-number')
// const proUn = document.querySelector('.one')
// const proDeux = document.querySelector('.two')
// const proTrois = document.querySelector('.three')
// const proQuatre = document.querySelector('.four')
// const proCinq = document.querySelector('.five')
// const proSix = document.querySelector('.six')
// const proSept = document.querySelector('.seven')
// const proHuit = document.querySelector('.eight')
// const proNeuf = document.querySelector('.nine')
// const proDix = document.querySelector('.ten')

// const playerInput = document.getElementById("player-input")
// const checked = document.querySelector('.checked')
// const crossed = document.querySelector('.crossed')
// const scorePoints = document.querySelector('.score-points')
// // const easyGame = document.querySelector('.easy-game')
// const buttonHere = document.querySelector('.bout')

// let score = 0
// let currentQuestion = 0
// const questionNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// const easyGame = document.querySelector('.easy-game');
// // const progressBar = [proUn, proDeux, proTrois, proQuatre, proCinq, proSix, proSept, proHuit, proNeuf, proDix]

// document.addEventListener('DOMContentLoaded', () => {

//   console.log(easyGame);

//   easyGame.addEventListener('click', () => {
//     const url = 'http://localhost:3000/ten_players';
//     easyGame.classList.add("d-none")
//     let obj = []


//       fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         if (document.readyState === 'complete') {


//           console.log(data);

//           console.log(document.querySelector('.player-image'));
//           document.getElementById('image').src = data[currentQuestion].photo
//           console.log(data[currentQuestion].photo);
//           console.log(document.querySelector('.player-image').src);
//           obj.push(data)
//         }



//       });
//   });
// });




// document.addEventListener('DOMContentLoaded', () => {

//   const easyGame = document.querySelector('.easy-game')
//   console.log(easyGame);



// easyGame.addEventListener('click', () => {



//   window.addEventListener('load', () => {
//         const url = 'http://localhost:3000/ten_players'

//         fetch(url)
//         .then(response => response.json())
//         .then(data => {

//           console.log(data);
//         // Sélectionner les éléments DOM une fois la nouvelle page chargée
//         const imagePlayer = document.querySelector('#image');
//         const layer = document.querySelector('.five');

//         // Vérifier si les éléments ont été trouvés
//         if (imagePlayer && layer) {
//             // Faire quelque chose avec les éléments DOM trouvés
//             console.log('Image Player trouvé :', imagePlayer);
//             console.log('Layer trouvé :', layer);
//         } else {
//             console.log('Les éléments DOM n\'ont pas été trouvés.');
//         }
//     });

//         // const imagePlayer = document.querySelector('#image')
//         // const layer = document.querySelector('.five')

//         // console.log(layer);

//         // console.log(imagePlayer);
//         // console.log(data[currentQuestion].photo);
//         // imagePlayer.src = data[currentQuestion].photo


//           // while (currentQuestion < 10) {
//           //   displayQuestions(data, currentQuestion);
//           // }
//         })


//   })


// })

// const displayQuestions = (data, currentQuestion) => {
//   showPhoto(data[currentQuestion])

//   buttonHere.addEventListener('click', () => {
//     const userAnswer = playerInput.value.toLowerCase();
//     const correctAnswer = `${data[currentQuestion].first_name.toLowerCase()} ${data[currentQuestion].last_name.toLowerCase()}`;

//     if (userAnswer === correctAnswer) {
//       checked.classList.remove('visual');
//       score += 10;
//     } else {
//       response.value = '';
//     }

//     nextQuestion(data, currentQuestion)


//   })

// }

// const showPhoto = (player) => {
//   document.addEventListener("DOMContentLoaded", () => {
//     const playerImage = document.getElementById('image-player')
//     playerImage.src = player.photo
//   })
// }

// const nextQuestion = (data, currentQuestion) => {
//   currentQuestion++;

//   if (currentQuestion < 9) {
//     showPhoto(data[currentQuestion]);
//     playerInput.value = '';
//     scorePoints.innerText = `${score} points`
//   } else {
//     scorePoints.innerText = `Score Final : ${score} points`
//     buttonHere.classList.add('d-none')
//   }
// }
