export default function createElement({
  tagName, className = '', textContent, onClickHandler,
}) {
  const element = document.createElement(tagName);
  if (className !== '') { // only attempt to add classes if className is not empty
    className.split(' ').forEach((/** @type {string} */ name) => {
      element.classList.add(name);
    });
  }
  if (textContent) {
    element.textContent = textContent.toString();
  }
  if (onClickHandler) {
    element.addEventListener('click', onClickHandler);
  }
  return element;
}
