const defaults = {
  style: {
    background:
      "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Ffirewatch-nature-m1-1920x1080.jpeg",
    foreground: "#FFFFFF",
    circular: false,
    css: "",
  },
  modules: {
    time: {
      show: true,
      "24hour": true,
      ampm: false,
    },
    weather: {
      show: true,
      units: "metric",
    },
    search: {
      show: true,
      engine: "https://www.google.com/search",
      placeholder: false,
    },
    bookmarks: {
      show: true,
      items: [
        "https://google.com",
        "https://youtube.com",
        "https://mail.google.com",
      ],
    },
  },
  settings: {
    timezone: false,
  },
};

chrome.storage.sync.get(defaults, (config) => {
  const body = document.querySelector("body");
  const style = document.querySelector("style");
  const time = document.getElementById("time");
  const weather = document.getElementById("weather");
  const icon = document.getElementById("icon");
  const type = document.getElementById("type");
  const temp = document.getElementById("temp");
  const search = document.getElementById("search");
  const input = search.elements.q;
  const bookmarks = document.getElementById("bookmarks");

  // Style
  body.style.background = `url("${
    config.style.background ===
    "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Ffirewatch-nature-m1-1920x1080.jpeg"
      ? "/bg.jpeg"
      : config.style.background
  }") no-repeat center fixed`;
  body.style.backgroundSize = `cover`;
  body.style.backgroundPosition = `center`;
  body.style.height = `100%`;
  const booka = convertToRGB(config.style.foreground);
  const bookb = convertToRGB(config.style.foreground);
  booka.push(0.15);
  bookb.push(0.2);
  style.innerHTML =
    `:root { --color: ${config.style.foreground}; --booka: rgba(${booka.join(
      ", "
    )}); bookb: rgba(${bookb.join(", ")}); }` + config.style.css;
  document
    .getElementById("point")
    .setAttribute("stroke", config.style.foreground);

  if (config.style.circular === true) {
    search.setAttribute("class", "circle");
    bookmarks.setAttribute("class", "circle");
  }

  // Time
  if (config.modules.time.show === true) {
    time.style.display = "";

    var options = config.modules.time["24hour"]
      ? { hour: "numeric", minute: "numeric", hour12: false }
      : {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

    if (config.settings.timezone !== false)
      options.timeZone = config.settings.timezone;

    function loadTime() {
      var newTime = config.modules.time.ampm
        ? new Date().toLocaleString("en-GB", options)
        : new Date()
            .toLocaleString("en-GB", options)
            .replace(/am|pm| /gi, "")
            
      if (newTime.indexOf("0:") === 0) newTime.replace("0:", "12:")
      
      time.innerText = newTime;
    }
    
    loadTime();

    setInterval(loadTime, 1000);
  }

  // Weather
  if (config.modules.weather.show === true) {
    weather.style.display = "";
    function loadWeather() {
      navigator.geolocation.getCurrentPosition(
        function (location) {
          var units = config.modules.weather.units;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lang=EN&lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=${units}&appid=8e586fc94a1f3326672f6733aa38fd55`
          )
            .then((response) => response.json())
            .then((weatherData) => {
              icon.setAttribute(
                "class",
                "wi wi-owm-" + weatherData.weather[0].id
              );
              type.innerText = weatherData.weather[0].main;
              temp.innerText = Math.round(weatherData.main.temp) + "°";
            });
        },
        function (error) { console.log(error) }
      );
    }
    
    loadWeather()
    
    setInterval(loadWeather, 300000);
  }

  // Search
  if (config.modules.search.show === true) {
    search.style.display = "";

    const placeholders = [
      "What is my IP?",
      "What is the time?",
      "What is the weather?",
      "How do I vote?",
      "How do I tie a tie?",
      "What song is this?",
      "When is mother's day?",
      "How to take a screenshot.",
      "How do I make money?",
      "How do I spell?",
      "How do I make French Toast?",
      "When is Labor Day?",
      "Why is the sky blue?",
      "What does 'lol' mean?",
      "What is a verb?",
      "Why am I bored?",
      "How do I boil an egg?",
      "What should I watch?",
      "What is global warming?",
      "What is a meme?",
      "Who unfollowed me?",
      "How do I learn English?",
      "How do I code?",
      "Who invented the internet?",
      "How do I make guacamole?",
      "How do I French Braid?",
      "How do I make cookies?",
      "How old is Selena Gomez?",
      "How much water should I drink?",
      "How do I clear cache?",
      "How do I draw?",
      "How to write a book?",
      "How to cook bacon?",
      "Why do we yawn?",
      "How do I sell on eBay?",
      "How do I make Mac 'n' Cheese?",
      "Who invented the light bulb?",
      "What does 🙌 mean?",
      "How do I tie a scarf?",
      "When are the Oscars?",
      "What is a computer?",
      "How to play UNO?",
      "What is a CV?",
      "How do I install Windows?",
      "Can you see me?",
      "Hint: hover on the bottom right",
    ];
    const placeholder =
      placeholders[Math.floor(Math.random() * placeholders.length)];

    search.setAttribute("action", config.modules.search.engine);
    if (config.modules.search.placeholder !== false) {
      input.setAttribute("placeholder", config.modules.search.placeholder);
    } else {
      input.setAttribute("placeholder", placeholder);
    }
  }

  // Bookmarks
  if (
    config.modules.bookmarks.show === true &&
    config.modules.bookmarks.items != 0
  ) {
    bookmarks.style.display = "";

    config.modules.bookmarks.items.forEach((bookmark) => {
      bookmarks.innerHTML += `
    <a href="${bookmark}">
      <img
        src="https://favicon.splitbee.io/?url=${bookmark}"
        width="22px"
        height="22px"
      />
    </a>
    `;
    });
  }
});

// Convert to RGB
function convertToRGB(hex) {
  hex = hex.replace(/#/g, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }
  // validate hex format
  var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
  if (result) {
    var red = parseInt(result[1], 16);
    var green = parseInt(result[2], 16);
    var blue = parseInt(result[3], 16);

    return [red, green, blue];
  } else {
    // invalid color
    return null;
  }
}
