const config = {
  style: {
    background:
      "https://cdn.glitch.com/fbcc75ee-28e3-462b-9d78-8dd9e7264ccd%2Fken-cheung-KonWFWUaAuk-unsplash.jpg?v=1620121865175",
    round: false,
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
        "https://notion.so",
        "https://youtube.com",
        "https://mail.google.com"
      ]
    }
  }
};

// Style

// Time
if (config.modules.time.show === true) {
  const time = document.getElementById("time");

  time.style.display = "";

  const options = config.modules.time["24hour"]
    ? { hour: "numeric", minute: "numeric", hour12: false }
    : {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      };

  time.innerText = config.modules.time.ampm
    ? new Date().toLocaleString("en-GB", options)
    : new Date().toLocaleString("en-GB", options).replace(/am|pm| /gi, "");

  setInterval(() => {
    time.innerText = config.modules.time.ampm
      ? new Date().toLocaleString("en-GB", options)
      : new Date().toLocaleString("en-GB", options).replace(/am|pm| /gi, "");
  }, 1000);
}

// Weather
if (config.modules.weather.show === true) {
  const weather = document.getElementById("weather");
  const icon = document.getElementById("icon");
  const type = document.getElementById("type");
  const temp = document.getElementById("temp");

  weather.style.display = "";

  const loadWeather = async function() {
    const location = await (await fetch("https://ip2tz.isthe.link/")).json();

    var units = config.modules.weather.units;

    const weatherData = await (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lang=EN&lat=${location.latitude}&lon=${location.longitude}&units=${units}&appid=8e586fc94a1f3326672f6733aa38fd55`
    )).json();

    icon.setAttribute("class", "wi wi-owm-" + weatherData.weather[0].id);
    type.innerText = weatherData.weather[0].main;
    temp.innerText = Math.round(weatherData.main.temp) + "°";
  };

  loadWeather();
}

// Search
if (config.modules.search.show === true) {
  const search = document.getElementById("search");
  const input = search.elements.q;

  search.style.display = "";

  const placeholders = [
    "What is the weather?",
    "How tall is the empire state building?",
    "Why is the sky blue?",
    "How much is Bitcoin worth?",
    "What is the internet?",
    "What is Elon Musk's net worth?",
    "What's my IP?",
    "What time is it in Beijing?",
    "How old is Joe Biden?",
    "What is Reddit?",
    "What is COVID-19?",
    "How to code"
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
if (config.modules.bookmarks.show === true) {
  const bookmarks = document.getElementById("bookmarks");

  bookmarks.style.display = "";

  config.modules.bookmarks.items.forEach(bookmark => {
    bookmarks.innerHTML += `
  <a href="${bookmark}">
    <img 
      src="https://favicon.splitbee.io/?url=${bookmark}"
      width="20px"
      height="20px"
    />
  </a>
  `;
  });
}
