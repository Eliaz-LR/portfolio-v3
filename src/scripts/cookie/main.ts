import { animatePlusOneOnCookieClick } from "./animations";

var client_id = Math.floor(Math.random() * 1000000);
var ws = new WebSocket(`ws://127.0.0.1:8000/ws/${client_id}`);
// var ws = new WebSocket(
//   `wss://cookie-multiplayer-counter.fly.dev:443/ws/${client_id}`
// );

var hit_count = 0;
var click_display: NodeListOf<Element>;
var connected_count = 0;
var connected_people: NodeListOf<Element>;

ws.onmessage = (event) => handle_message(event);

function handle_message(event: MessageEvent) {
  console.log(event.data);
  var data = JSON.parse(event.data);

  switch (data.type) {
    case "hit_count":
      hit_count = data.number;
      click_display.forEach((element) => {
        element.setAttribute("data-tip", hit_count.toString());
      });
      break;
    case "connected_count":
      connected_count = data.number;
      connected_people.forEach((element) => {
        element.textContent = connected_count.toString();
      });
      break;
  }
}
function on_cookie_click(event: MouseEvent) {
  animatePlusOneOnCookieClick(event);
  ws.send(
    JSON.stringify({
      type: "click",
    })
  );
}

function initBinding() {
  console.log("init binding");

  const ws_id = document.querySelectorAll("#ws-id");
  ws_id.forEach((element) => {
    element.textContent = client_id.toString();
  });

  click_display = document.querySelectorAll("#click-tip-display");
  click_display.forEach((element) => {
    element.setAttribute("data-tip", hit_count.toString());
  });

  connected_people = document.querySelectorAll("#connected-people");
  connected_people.forEach((element) => {
    element.textContent = connected_count.toString();
  });

  const cookie = document.querySelectorAll("#cookie");
  cookie.forEach((element) => {
    const clickHandler = (event: MouseEvent) => {
      event.preventDefault();
      on_cookie_click(event);
    };
    element.addEventListener("click", clickHandler);
  });
}

initBinding();
document.addEventListener("astro:after-swap", initBinding);
