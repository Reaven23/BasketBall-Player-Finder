import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["overlay", "card"]

  connect() {
    console.log("hello Overlay");
  }

  showOverlay(event) {
    this.overlayTarget.classList.remove("d-none");

    event.currentTarget.classList.add("highlight-card");
  }

  hideOverlay(event) {
    this.overlayTarget.classList.add("d-none");

    event.currentTarget.classList.remove("highlight-card");
  }
}
