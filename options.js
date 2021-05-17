// Dynamic Stuff
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

// Save Options
function save() {
  const config = {
    style: {
      background:
        document.querySelector("#background > input").value === "default"
          ? "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fjellyfish.jpeg"
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
        items: [
          // do this pls
          "https://google.com",
          "https://youtube.com",
          "https://mail.google.com"
        ]
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
    document.getElementById("save").textContent = "Saved!";
    setTimeout(() => {
      document.getElementById("save").textContent = "Save";
    }, 750);
  });
}

// Restore Previously Set Options
function restore() {
  const config = {
    style: {
      background:
        "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fjellyfish.jpeg",
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
    document.getElementById("engine").value = items.engine;
  });
}

// Run Code
document.addEventListener("DOMContentLoaded", restore);
document.getElementById("save").addEventListener("click", save);
