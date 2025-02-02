import { createElement } from "../models/utils.js";

export class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = "";
    this.modalCloseBtn = "";
    this.overlay = "";
  }

  buildModal(content) {
    //Overlay
    this.overlay = createElement("div", ["overlay", "overlay_modal"]);

    //Modal
    this.modal = createElement("div", ["modal", this.classes]);

    //Close Button
    this.modalCloseBtn = createElement("span", ["span", "modal__close-icon"]);
    this.modalCloseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M30 10L10 30" stroke="#ffe23e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 10L30 30" stroke="#ffe23e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

    this.setContent(content);

    this.appendModalElements();

    // Bind Events
    this.bindEvents();

    // Open Modal
    this.openModal();
  }

  setContent(content) {
    if (typeof content === "string") {
      this.modal.innerHTML = content;
    } else {
      this.modal.innerHTML = "";
      this.modal.appendChild(content);
    }
  }

  appendModalElements() {
    this.modal.append(this.modalCloseBtn);
    this.overlay.append(this.modal);
  }

  bindEvents() {
    this.modalCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeModal(e);
    });

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) {
        this.closeModal(e);
      }
    });
  }

  openModal() {
    document.body.append(this.overlay);
    document.body.classList.add("scroll-off");
  }

  closeModal(e) {
    let element = e.target;
    if (
      element.classList.contains("overlay") ||
      element.closest(".modal__close-icon")
    ) {
      document.body.classList.remove("scroll-off");
      document.querySelector(".overlay").remove();
    }
  }
}
