const db = require("quick.db");
const axios = require("axios");
const moment = require("moment");

async function fetchNews() {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const news = async query => {
    const q = encodeURIComponent(query);
    const url = `http://newsapi.org/v2/top-headlines?q=${q}&country=tw&apiKey=${NEWS_API_KEY}`;
    const res = await axios.get(url);
    return res.data;
  };

  const combined = await Promise.all([news("疫情"), news("肺炎")]);
  const h = {};
  combined
    .flat()
    .map(d => d.articles)
    .flat()
    .forEach(obj => {
      h[obj.url] = obj;
    });
  const result = Object.values(h);

  db.set("news", result);
  console.log("News Updated", moment().format());
  setTimeout(fetchNews, 3600 * 886); // 1 hour
}

module.exports = { fetchNews };
