import {
  animateStringOnClick,
  animateShakeOnElement,
  animateHoardStringOnClick,
} from "./animations";

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
var needs_to_send = true;
var num_clicks_since_last_send = 0;

ws.onmessage = (event) => handle_message(event);

function handle_message(event: MessageEvent) {
  console.log(event.data);
  var data = JSON.parse(event.data);

  switch (data.type) {
    case "hit_count":
      if (data.number > hit_count) {
        hit_count = data.number;
        render_hit_count();
      }
      break;
    case "connected_count":
      connected_count = data.number;
      connected_people.forEach((element) => {
        element.textContent = connected_count.toString();
      });
      break;
  }
}

function send_clicks() {
  if (
    num_clicks_since_last_send > 0 &&
    ws.readyState == ws.OPEN &&
    needs_to_send
  ) {
    needs_to_send = false;
    ws.send(
      JSON.stringify({
        type: "click",
        number: num_clicks_since_last_send,
      })
    );
    console.log("sent " + num_clicks_since_last_send + " clicks");
    num_clicks_since_last_send = 0;
    setTimeout(() => {
      needs_to_send = true;
      send_clicks();
    }, 1000);
  } else {
  }
}

function on_cookie_click(event: MouseEvent) {
  local_hit_count += 1;
  num_clicks_since_last_send += 1;
  hit_count += 1;
  render_hit_count();
  send_clicks();
  set_local_storage(local_hit_count);

  let coords = { x: event.clientX, y: event.clientY };
  let coords_cookie = { x: event.clientX, y: event.clientY };
  cookie.forEach((element) => {
    coords_cookie = {
      x: element.getBoundingClientRect().left + 100,
      y: element.getBoundingClientRect().top + 100,
    };

    if (local_hit_count % 100 == 0) {
      animateStringOnClick(coords, "+100", ["text-5xl", "z-10"]);
      animateHoardStringOnClick(coords_cookie, "🍪", 50, ["text-xl"]);
      animateHoardStringOnClick(coords_cookie, "🚀", 10, ["text-xl"]);
      animateShakeOnElement(element, true);
    } else if (local_hit_count % 25 == 0) {
      animateShakeOnElement(element);
      animateStringOnClick(coords, "+25", ["text-4xl", "z-10"]);
      animateHoardStringOnClick(coords_cookie, "🍪", 15, ["text-xl"]);
      animateHoardStringOnClick(coords_cookie, "🚀", 3, ["text-xl"]);
    } else if (local_hit_count % 10 == 0) {
      animateShakeOnElement(element);
      animateStringOnClick(coords, "+10", ["text-3xl", "z-10"]);
      animateHoardStringOnClick(coords_cookie, "🍪", 5, ["text-xl"]);
      animateHoardStringOnClick(coords_cookie, "🚀", 1, ["text-xl"]);
    } else {
      animateShakeOnElement(element);
      animateStringOnClick(coords, "+1", ["text-2xl", "z-10"]);
      animateHoardStringOnClick(coords_cookie, "🍪", 1, ["text-xl"]);
    }
  });
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

  render_hit_count();
}

initBinding();
document.addEventListener("astro:after-swap", initBinding);
