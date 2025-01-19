export function createElement(tag, classes = [], textContent = "") {
  const element = document.createElement(tag);
  if (classes.length) element.classList.add(...classes);
  if (textContent) element.textContent = textContent;
  return element;
}
