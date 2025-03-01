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

  shareSite(event) {
    event.preventDefault(); // Empêche le comportement par défaut si nécessaire

    const siteUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Viens découvrir ce super site !");


    this.showShareMenu(siteUrl, text);
    console.log("hey hey");

      // Utilisation de l'API Web Share si disponible



  }

  showShareMenu(siteUrl, text) {

    const shareMenu = document.querySelector(".share-site");
    shareMenu.classList.add("share-menu");
    shareMenu.innerHTML = `
    <div class="share-buttons">
      <a href="https://wa.me/?text=${text} ${siteUrl}" target="_blank" class="share-btn whatsapp">
        <i class="fab fa-whatsapp"></i> WhatsApp
      </a>
      <a href="mailto:?subject=Regarde ce site !&body=${text} ${siteUrl}" target="_blank" class="share-btn gmail">
        <i class="fas fa-envelope"></i> Gmail
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${siteUrl}" target="_blank" class="share-btn facebook">
        <i class="fab fa-facebook"></i> Facebook
      </a>
      <a href="https://www.instagram.com/?url=${siteUrl}" target="_blank" class="share-btn instagram">
        <i class="fab fa-instagram"></i> Instagram
      </a>
      <a href="https://x.com/intent/post?text=${text}&url=${siteUrl}" target="_blank" class="share-btn x-twitter">
        <i class="fab fa-x-twitter"></i> X 
      </a>
    </div>
    `;

    // Supprime le menu après 8 secondes
  }
}
