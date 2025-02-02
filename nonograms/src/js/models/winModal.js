import { Modal } from "../components/Modal.js";
import { createElement } from "./utils.js";

export const buildWinModal = (name, difficulty, time) => {
  const message = createElement(
    "p",
    ["win__message"],
    `Congratulations 🎉 You have completely solved the ${name} picture in ${time} seconds`
  );

  const modal = new Modal("modal__win");
  modal.buildModal(message);
};
