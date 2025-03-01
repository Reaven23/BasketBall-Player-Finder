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
  }

  showShareMenu(siteUrl, text) {

    const shareMenu = document.querySelector(".share-site");
    shareMenu.classList.add("share-menu");
    shareMenu.innerHTML = `
    <div class="share-buttons">
      <a href="https://wa.me/?text=${text} ${siteUrl}" target="_blank" class="share-btn whatsapp" data-action="click->no-game#share">
        <i class="fab fa-whatsapp"></i> WhatsApp
      </a>
      <a href="mailto:?subject=Regarde ce site !&body=${text} ${siteUrl}" target="_blank" class="share-btn gmail" data-action="click->no-game#share">
        <i class="fas fa-envelope"></i> Gmail
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${siteUrl}" target="_blank" class="share-btn facebook" data-action="click->no-game#share">
        <i class="fab fa-facebook"></i> Facebook
      </a>
      <a href="https://www.instagram.com/?url=${siteUrl}" target="_blank" class="share-btn instagram" data-action="click->no-game#share">
        <i class="fab fa-instagram"></i> Instagram
      </a>
      <a href="https://x.com/intent/post?text=${text}&url=${siteUrl}" target="_blank" class="share-btn x-twitter" data-action="click->no-game#share">
        <i class="fab fa-x-twitter"></i> X
      </a>
    </div>
    `;
  }

  share(event) {
    event.preventDefault();

    const url = event.currentTarget.href;

    // Ouvrir le partage dans une nouvelle fenêtre AVANT de faire le fetch
    window.open(url, "_blank");

    fetch(`/user/add_games_after_share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("✅ Réponse JSON :", data);
      if (data.success) {
        this.showNotification("🎉 Merci pour le partage ! Vous avez gagné 2 parties !");

        // Attendre 4 secondes avant de recharger la page
        setTimeout(() => {
          location.reload();
        }, 8000);
      } else {
        this.showNotification("❌ Erreur : " + data.error, "error");
      }
    })
    .catch(error => {
      console.error("❌ Erreur lors de la requête :", error);
      this.showNotification("❌ Une erreur est survenue. Essayez à nouveau.", "error");
    });
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.classList.add("custom-notification", type);
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 500);
    }, 8000);
  }

}
