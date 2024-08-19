import { animateStringOnClick, animateShakeOnElement } from "./animations";

var client_id = Math.floor(Math.random() * 1000000);
// var ws = new WebSocket(`ws://127.0.0.1:8000/ws/${client_id}`);
var ws = new WebSocket(
  `wss://cookie-multiplayer-counter.fly.dev:443/ws/${client_id}`
);

var hit_count = 0;
var local_hit_count = get_local_storage();
var local_num_clicks: NodeListOf<Element>;
var click_display: NodeListOf<Element>;
var connected_count = 0;
var connected_people: NodeListOf<Element>;
var cookie: NodeListOf<Element>;

ws.onmessage = (event) => handle_message(event);

function handle_message(event: MessageEvent) {
  console.log(event.data);
  var data = JSON.parse(event.data);

  switch (data.type) {
    case "hit_count":
      hit_count = data.number;
      render_hit_count();
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
  local_hit_count += 1;
  ws.send(
    JSON.stringify({
      type: "click",
    })
  );
  set_local_storage(local_hit_count);

  if (local_hit_count % 100 == 0) {
    cookie.forEach((element) => {
      animateStringOnClick(event, "+100", ["text-5xl"]);
      animateShakeOnElement(element);
    });
  } else if (local_hit_count % 25 == 0) {
    animateStringOnClick(event, "+25", ["text-4xl"]);
  } else if (local_hit_count % 10 == 0) {
    animateStringOnClick(event, "+10", ["text-3xl"]);
  } else {
    animateStringOnClick(event, "+1", ["text-2xl"]);
  }
}

function render_hit_count() {
  click_display.forEach((element) => {
    element.setAttribute("data-tip", hit_count.toString());
  });
  local_num_clicks.forEach((element) => {
    element.textContent =
      local_hit_count.toString() +
      " (" +
      ((100 * local_hit_count) / hit_count).toFixed(5);
  });
}

function set_local_storage(number: number) {
  if (number < hit_count) {
    localStorage.setItem("hit_count", number.toString());
  } else {
    localStorage.setItem("hit_count", (0).toString());
  }
}

function get_local_storage(): number {
  var value = localStorage.getItem("hit_count");
  if (value) {
    hit_count = parseInt(value);
    return hit_count;
  }
  return 0;
}

function initBinding() {
  console.log("init binding");

  click_display = document.querySelectorAll("#click-tip-display");
  local_num_clicks = document.querySelectorAll("#local-num-clicks");

  connected_people = document.querySelectorAll("#connected-people");
  connected_people.forEach((element) => {
    element.textContent = connected_count.toString();
  });

  cookie = document.querySelectorAll("#cookie");
  cookie.forEach((element) => {
    element.addEventListener("click", (event: MouseEvent) => {
      on_cookie_click(event);
    });
  });
}

initBinding();
document.addEventListener("astro:after-swap", initBinding);
