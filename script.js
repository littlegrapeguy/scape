const config = {
  time: {
    "24hour": true,
    show: true
  },
  date: {
    show: false
  },
  weather: {
    show: true,
    location: "auto"
  },
  search: {
    show: true,
    engine: "https://www.bing.com/search",
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
};

// Time
document.getElementById("time").innerText = new Date().toLocaleString([], {
  hour: "2-digit",
  minute: "2-digit"
});
setInterval(() => {
  document.getElementById("time").innerText = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}, 1000);

// Date

// Weather
const icon = document.getElementById("icon");
const type = document.getElementById("type");
const temp = document.getElementById("temp");

fetch("https://ipwhois.app/json/")
  .then(ipdata => ipdata.json())
  .then(ipjson => {
    var units = "metric";
    if (ipjson.country_code === "US") units = "imperial";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lang=EN&lat=${ipjson.latitude}&lon=${ipjson.longitude}&units=${units}&appid=8e586fc94a1f3326672f6733aa38fd55`
    )
      .then(weatherdata => weatherdata.json())
      .then(weatherjson => {
        icon.setAttribute("class", "wi wi-owm-" + weatherjson.weather[0].id);
        type.innerText = weatherjson.weather[0].main;
        temp.innerText = Math.round(weatherjson.main.temp) + "°";
      });
  });

// Search
const search = document.getElementById("search");
const input = search.elements.q;
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
  "What is Reddit?"
];
const placeholder =
  placeholders[Math.floor(Math.random() * placeholders.length)];
search.setAttribute("action", config.search.engine);
if (config.search.placeholder !== false) {
  input.setAttribute("placeholder", config.search.placeholder);
} else {
  input.setAttribute("placeholder", placeholder);
}

// Bookmarks
const bookmarks = document.getElementById("bookmarks");

config.bookmarks.items.forEach(bookmark => {
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
