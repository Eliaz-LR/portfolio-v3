export function animateStringOnClick(
  coordinate: { x: number; y: number },
  stringToDisplay: string,
  classes: string[] = []
) {
  const plusOne = document.createElement("div");
  plusOne.textContent = stringToDisplay;
  // position the plusOne element at the click location
  plusOne.style.left = `${coordinate.x}px`;
  plusOne.style.top = `${coordinate.y}px`;
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

export function animateHoardStringOnClick(
  coordinate: { x: number; y: number },
  stringToDisplay: string,
  numHoard: number,
  classes: string[] = []
) {
  let delay = 0;
  for (let i = 0; i < numHoard; i++) {
    let x = coordinate.x + Math.floor(Math.random() * 150) - 75;
    let y = coordinate.y + Math.floor(Math.random() * 150) - 75;
    delay += Math.floor(Math.random() * 50);
    setTimeout(() => {
      animateStringOnClick({ x: x, y: y }, stringToDisplay, classes);
    }, delay);
  }
}

export function animateShakeOnElement(
  element: Element,
  isBig: boolean = false
) {
  let nameClass;
  let timeout;
  if (isBig) {
    nameClass = "animate-shake";
    timeout = 1000;
  } else {
    nameClass = "animate-smallShake";
    timeout = 100;
  }
  if (element.classList.contains(nameClass)) {
    return;
  }
  element.classList.add(nameClass);
  setTimeout(() => {
    element.classList.remove(nameClass);
  }, timeout);
}
