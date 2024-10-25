import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "scorer"];

  connect() {
    console.log("hello search");

    this.clearHighlights();
  }

  search() {
    const query = this.inputTarget.value.toLowerCase();
    this.clearHighlights();


    this.scorerTargets.forEach((scorer) => {
      const nickname = scorer.querySelector(".user-nickname").textContent.toLowerCase();

      if (nickname.includes(query) && query !== "") {
        scorer.classList.add("highlight");
        scorer.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  clearHighlights() {
    this.scorerTargets.forEach((scorer) => {
      scorer.classList.remove("highlight");
    });
  }
}
