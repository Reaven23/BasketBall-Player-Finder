<h1><%= Game.find(params[:id]).name  %></h1>
<div class="container-quizz">
  <div id="game" class="flex-column justify-center">
    <div id="progress-bar"></div>
    <div id="score"></div>
    <div class="image-player">
      <img id="photo-joueur" src="" alt="Photo du joueur de la question">
    </div>
    <div class="answer-user">
      <div class="answer"></div>
      <div class="response">
        <input type="text" id="user-answer" placeholder="Entrez la réponse">
        <button class="bout">Vérifier</button>
      </div>
    </div>
  </div>
</div>
