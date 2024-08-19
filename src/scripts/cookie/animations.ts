export function animatePlusOneOnCookieClick(event: MouseEvent) {
  const plusOne = document.createElement("div");
  plusOne.textContent = "+1";
  // position the plusOne element at the click location
  plusOne.style.left = `${event.clientX}px`;
  plusOne.style.top = `${event.clientY}px`;
  plusOne.classList.add("animate-fadeUp");
  plusOne.classList.add("absolute");
  plusOne.classList.add("text-2xl");
  plusOne.classList.add("select-none");
  plusOne.classList.add("pointer-events-none");
  document.body.appendChild(plusOne);
  setTimeout(() => {
    plusOne.remove();
  }, 1000);
}
