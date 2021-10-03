// Save Options
function save() {
  const config = {
    style: {
      background: document.querySelector("#background > input").value ? document.querySelector("#background > input").value : "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Ffirewatch-nature-m1-1920x1080.jpeg",
      circular:
        document.querySelector("#ui-style > select").value === "true"
          ? true
          : false,
      css: document.querySelector("#custom-css > textarea").value
    },
    modules: {
      time: {
        show: document.querySelector("#time .show-hide").checked,
        "24hour": document.querySelector("#time input[type=radio]").checked
          ? false
          : true,
        ampm: document.querySelector("#time input[name=ampm]").checked
      },
      weather: {
        show: document.querySelector("#weather .show-hide").checked,
        units: document.querySelector("#weather select").value
      },
      search: {
        show: document.querySelector("#search .show-hide").checked,
        engine: document.querySelector("#search select").value,
        placeholder: document.querySelector("#search #placeholder").value
          ? document.querySelector("#search #placeholder").value
          : false
      },
      bookmarks: {
        show: document.querySelector("#bookmarks .show-hide").checked,
        items: document.querySelector("#bookmarks textarea").value.split("\n") ? document.querySelector("#bookmarks textarea").value.split("\n") : []
      }
    },
    settings: {
       timezone:
        document.querySelector("#timezone > select").value === "false"
          ? false
          : document.querySelector("#timezone > select").value
    }
  };
  
  console.log(config);
  
  chrome.storage.sync.set(config, () => {
    document.getElementById("save").innerText = "Saved!";
    setTimeout(() => {
      document.getElementById("save").innerText = "Save";
    }, 750);
  });
}

// Restore Previously Set Options
function restore() {
  const defaults = {
    style: {
      background: "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Ffirewatch-nature-m1-1920x1080.jpeg",
      circular: false,
      css: ""
    },
    modules: {
      time: {
        show: true,
        "24hour": true,
        ampm: false
      },
      weather: {
        show: true,
        units: "metric"
      },
      search: {
        show: true,
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

  chrome.storage.sync.get(defaults, config => {
    // Background
    document.querySelector("#background input").value = config.style.background
    
    // UI Style
    document.querySelector(
      "#ui-style select"
    ).value = config.style.circular.toString();

    // Custom CSS
    document.querySelector("#custom-css textarea").value = config.style.css;

    // Time
    document.querySelector("#time .show-hide").checked = config.modules.time.show

    config.modules.time["24hr"]
      ? (document.querySelectorAll(
          "#time input[type=radio]"
        )[1].checked = true)
      : (document.querySelectorAll(
          "#time input[type=radio]"
        )[0].checked = true);

    document.querySelector("#time input[name=ampm]").checked =
      config.modules.time.ampm;

    // Weather
    document.querySelector("#weather .show-hide").checked = config.modules.weather.show
    
    document.querySelector("#weather select").value =
      config.modules.weather.units;

    // Search
    document.querySelector("#search .show-hide").checked = config.modules.search.show

    document.querySelector("#search select").value =
      config.modules.search.engine;

    document.querySelector("#search #placeholder").value = config.modules.search
      .placeholder
      ? config.modules.search.placeholder
      : "";

    // Bookmarks
    document.querySelector("#bookmarks .show-hide").checked = config.modules.bookmarks.show

    document.querySelector("#bookmarks textarea").value = config.modules.bookmarks.items.join("\n")
    
    // Timezone
    document.querySelector("#timezone select").value =
      config.settings.timezone;
  });
}

// Run Code
document.addEventListener("DOMContentLoaded", restore);
document.getElementById("save").addEventListener("click", save);
