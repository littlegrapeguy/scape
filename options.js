// Save Options
function save() {
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
        ampm: true
      },
      weather: {
        show: true,
        units: "metric",
        location: false // add this
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
        ampm: true
      },
      weather: {
        show: true,
        units: "metric",
        location: false // add this
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
