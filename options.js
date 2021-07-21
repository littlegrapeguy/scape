// Save Options
function save() {
  const config = JSON.parse(document.getElementById("json").value)

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
        show: false,
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
    document.getElementById("json").value = JSON.stringify(config)
  });
}

// Run Code
document.addEventListener("DOMContentLoaded", restore);
document.getElementById("save").addEventListener("click", save);
