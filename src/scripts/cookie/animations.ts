export function animateStringOnClick(
  event: MouseEvent,
  stringToDisplay: string,
  classes: string[] = []
) {
  const plusOne = document.createElement("div");
  plusOne.textContent = stringToDisplay;
  // position the plusOne element at the click location
  plusOne.style.left = `${event.clientX}px`;
  plusOne.style.top = `${event.clientY}px`;
  plusOne.classList.add("animate-fadeUp");
  plusOne.classList.add("absolute");
  plusOne.classList.add("select-none");
  plusOne.classList.add("pointer-events-none");
  for (const className of classes) {
    plusOne.classList.add(className);
  }
  document.body.appendChild(plusOne);
  setTimeout(() => {
    plusOne.remove();
  }, 1000);
}

export function animateShakeOnElement(element: Element) {
  element.classList.add("animate-shake");
  setTimeout(() => {
    element.classList.remove("animate-shake");
  }, 1000);
}
