import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("🎯 Stimulus 'no-game' connecté !");

    if (this.element.dataset.noGame === "true") {
      console.log("⚠️ Flash détecté, stockage local activé !");
      localStorage.setItem("showNoGamesModal", "true");
    }

    if (localStorage.getItem("showNoGamesModal") === "true") {
      console.log("📢 Affichage de la modale !");
      this.showModal();
      localStorage.removeItem("showNoGamesModal"); // Nettoyer après affichage
    }
  }

  showModal() {
    const modalElement = document.getElementById("no-games-modal");
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement); 
      modal.show();
    } else {
      console.log("❌ Modale non trouvée dans le DOM !");
    }
  }
}
