// Show / Hide Buttons
document.addEventListener(
  "click",
  event => {
    const element = event.target;

    if (!element.matches(".show-hide") && !element.matches(".show-hide > img"))
      return;

    const button = element.parentElement.matches(".show-hide")
      ? element.parentElement
      : element;
    const image = button.children[0];

    const state = button.getAttribute("state");
    const newState = state === "true" ? "false" : "true";

    button.setAttribute("state", newState);

    image.setAttribute(
      "src",
      newState === "true"
        ? "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fvisibility_black_24dp-2.svg?v=1620715760754"
        : "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fvisibility_off_black_24dp-2.svg?v=1620715758254"
    );
  },
  false
);

// Bookmarks Adding
const form = document.querySelector("#bookmarks > form");

form.addEventListener("submit", event => {
  event.preventDefault();

  document.querySelector(
    "#bookmarks > div"
  ).innerHTML += `<div class="bookmark">${form.elements.url.value} <span onclick="this.parentElement.remove()">✖</span></div>`;

  form.reset();
  form.elements.url.focus();
});

// Save Options
function save() {
  let bookmarks = [];
  document
    .querySelectorAll("#bookmarks > div > .bookmark")
    .forEach(element => bookmarks.push(element.innerText));
  const config = {
    style: {
      background:
        document.querySelector("#background > select").value === "default"
          ? "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fwallpapersden.com_minimalist-landscape-painting_1920x1080.jpg?v=1621298437241"
          : "",
      circular:
        document.querySelector("#ui-style > select").value === "true"
          ? true
          : false,
      css: document.querySelector("#custom-css > textarea").value
    },
    modules: {
      time: {
        show:
          document.querySelector("#time > .show-hide").getAttribute("state") ===
          "true"
            ? true
            : false,
        "24hour": document.querySelector("#time > input[type=radio]").checked
          ? false
          : true,
        ampm: document.querySelector("#time > input[type=checkbox]").checked
      },
      weather: {
        show:
          document
            .querySelector("#weather > .show-hide")
            .getAttribute("state") === "true"
            ? true
            : false,
        units: document.querySelector("#weather > select").value,
        location: false // do this pls
      },
      search: {
        show:
          document
            .querySelector("#search > .show-hide")
            .getAttribute("state") === "true"
            ? true
            : false,
        engine: document.querySelector("#search > select").value,
        placeholder: document.querySelector("#search > select").value
          ? document.querySelector("#search > select").value
          : false
      },
      bookmarks: {
        show:
          document
            .querySelector("#bookmarks > .show-hide")
            .getAttribute("state") === "true"
            ? true
            : false,
        items: bookmarks
      }
    },
    settings: {
      timezone:
        document.querySelector("#timezone > select").value === "false"
          ? false
          : document.querySelector("#timezone > select").value
    }
  };

  chrome.storage.sync.set(config, () => {
    document.getElementById("save").innerText = "Saved!";
    setTimeout(() => {
      document.getElementById("save").innerText = "Save";
    }, 750);
  });
}

// Restore Previously Set Options
function restore() {
  const config = {
    style: {
      background:
        "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fwallpapersden.com_minimalist-landscape-painting_1920x1080.jpg?v=1621298437241",
      circular: false,
      css: ""
    },
    modules: {
      time: {
        show: true,
        "24hour": false,
        ampm: false
      },
      weather: {
        show: true,
        units: "metric",
        location: false
      },
      search: {
        show: false,
        engine: "https://www.google.com/search",
        placeholder: false
      },
      bookmarks: {
        show: true,
        items: [
          "https://google.com",
          "https://youtube.com",
          "https://mail.google.com"
        ]
      }
    },
    settings: {
      timezone: false
    }
  };

  chrome.storage.sync.get(config, items => {
    // Background

    // UI Style
    document.querySelector(
      "#ui-style > select"
    ).value = items.style.circular.toString();

    // Custom CSS
    document.querySelector("#custom-css > textarea").value = items.style.css;

    // Time
    document
      .querySelector("#time > .show-hide")
      .setAttribute("state", items.modules.time.show);

    items.modules.time["24hr"]
      ? (document.querySelectorAll(
          "#time > input[type=radio]"
        )[1].checked = true)
      : (document.querySelectorAll(
          "#time > input[type=radio]"
        )[0].checked = true);

    document.querySelector("#time > input[type=checkbox]").checked =
      items.modules.time.ampm;

    // Weather
    document
      .querySelector("#weather > .show-hide")
      .setAttribute("state", items.modules.weather.show);

    document.querySelector("#weather > select").value =
      items.modules.weather.units;

    // Search
    document
      .querySelector("#search > .show-hide")
      .setAttribute("state", items.modules.search.show);

    document.querySelector("#search > select").value =
      items.modules.search.engine;

    document.querySelector("#search > input").value = items.modules.search
      .placeholder
      ? items.modules.search.placeholder
      : "";

    // Bookmarks
    document
      .querySelector("#bookmarks > .show-hide")
      .setAttribute("state", items.modules.bookmarks.show);

    items.modules.bookmarks.items.forEach(url => {
      document.querySelector(
        "#bookmarks > div"
      ).innerHTML += `<div class="bookmark">${url} <span onclick="this.parentElement.remove()">✖</span></div>`;
    });

    // Timezone
    document.querySelector("#timezone > select").value =
      items.settings.timezone;
  });
}

// Run Code
document.addEventListener("DOMContentLoaded", restore);
document.getElementById("save").addEventListener("click", save);