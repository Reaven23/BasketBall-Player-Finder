const imagePlayer = document.getElementById('photo-joueur');
const response = document.querySelector('#user-answer');
const buttonHere = document.querySelector('.bout')
console.log(response.id);



document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000/players';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data[1].first_name);
      imagePlayer.src = data[1].photo

      buttonHere.addEventListener('click', () => {
        console.log(response.value);
        if (response.value.toLowerCase() === data[1].first_name.toLowerCase()) {
          console.log('well done');
        } else {
          console.log('loser');
        }
      });

    })
  })
