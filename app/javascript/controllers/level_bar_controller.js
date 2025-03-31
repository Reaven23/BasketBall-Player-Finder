import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="level-bar"
export default class extends Controller {
  static values = {
    progress: Number,
    currentPoints: Number,
    nextLevelPoints: Number
  }

  static targets = ["progressBar"]

  connect() {
    this.updateBar();
  }

  updateBar() {
    const progressPercentage = this.progressValue;
    this.progressBarTarget.style.width = `${progressPercentage}%`;
    this.progressBarTarget.innerText = `${Math.floor(progressPercentage.toFixed(2))}%`;
  }
}
