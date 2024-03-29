const question = document.querySelector('.question-number')
const proUn = document.querySelector('.one')
const proDeux = document.querySelector('.two')
const proTrois = document.querySelector('.three')
const proQuatre = document.querySelector('.four')
const proCinq = document.querySelector('.five')
const proSix = document.querySelector('.six')
const proSept = document.querySelector('.seven')
const proHuit = document.querySelector('.eight')
const proNeuf = document.querySelector('.nine')
const proDix = document.querySelector('.ten')
const playerImage = document.querySelector('.pl-img')
const playerInput = document.getElementById("player-input")
const checked = document.querySelector('.checked')
const crossed = document.querySelector('.crossed')
const scorePoints = document.querySelector('.score-points')
const easyGame = document.querySelector('.easy-game')

let score = 0
let currentQuestion = 0

document.addEventListener('click', () => {
  const url = 'http://localhost:3000/ten_players'

  fetch(url)
    .then(response => response.json())
    .then(data => {
      
    })
})
