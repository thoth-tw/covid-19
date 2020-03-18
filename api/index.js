/*
  Ref: https://github.com/NovelCOVID/API
*/

const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("quick.db");

require("dotenv").config();

// get all
async function getWorld() {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("ERROR");
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = {};

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  html(".maincounter-number").filter((i, el) => {
    let count = el.children[0].next.children[0].data || "0";
    count = parseInt(count.replace(/,/g, "") || "0", 10);
    // first one is
    if (i === 0) {
      result.cases = count;
    } else if (i === 1) {
      result.deaths = count;
    } else {
      result.recovered = count;
    }
  });
  result.updated = Date.now();
  db.set("world", result);
  console.log("Summary Updated");

  setTimeout(getWorld, 5 * 60 * 1000); // 5 mins
}

// get countries
async function getCountries() {
  let response;
  try {
    response = await axios.get("https://www.worldometers.info/coronavirus/");
    if (response.status !== 200) {
      console.log("Error", response.status);
    }
  } catch (err) {
    return null;
  }

  // to store parsed data
  const result = [];

  // get HTML and parse death rates
  const html = cheerio.load(response.data);
  const countriesTable = html("table#main_table_countries_today");
  const countriesTableCells = countriesTable
    .children("tbody")
    .children("tr")
    .children("td");

  // NOTE: this will change when table format change in website
  const totalColumns = 9;
  const countryColIndex = 0;
  const casesColIndex = 1;
  const todayCasesColIndex = 2;
  const deathsColIndex = 3;
  const todayDeathsColIndex = 4;
  const curedColIndex = 5;
  const criticalColIndex = 7;

  // minus totalColumns to skip last row, which is total
  for (let i = 0; i < countriesTableCells.length - totalColumns; i += 1) {
    const cell = countriesTableCells[i];

    // get country
    if (i % totalColumns === countryColIndex) {
      let country =
        cell.children[0].data ||
        cell.children[0].children[0].data ||
        // country name with link has another level
        cell.children[0].children[0].children[0].data ||
        cell.children[0].children[0].children[0].children[0].data ||
        "";
      country = country.trim();
      if (country.length === 0) {
        // parse with hyperlink
        country = cell.children[0].next.children[0].data || "";
      }
      result.push({
        country: country.trim() || ""
      });
    }
    // get cases
    if (i % totalColumns === casesColIndex) {
      let cases = cell.children[0].data || "";
      result[result.length - 1].cases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today cases
    if (i % totalColumns === todayCasesColIndex) {
      let cases = cell.children[0].data || "";
      result[result.length - 1].todayCases = parseInt(
        cases.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get deaths
    if (i % totalColumns === deathsColIndex) {
      let deaths = cell.children[0].data || "";
      result[result.length - 1].deaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get today deaths
    if (i % totalColumns === todayDeathsColIndex) {
      let deaths = cell.children[0].data || "";
      result[result.length - 1].todayDeaths = parseInt(
        deaths.trim().replace(/,/g, "") || "0",
        10
      );
    }
    // get cured
    if (i % totalColumns === curedColIndex) {
      let cured = cell.children[0].data || 0;
      result[result.length - 1].recovered = parseInt(
        cured.trim().replace(/,/g, "") || 0,
        10
      );
    }
    // get critical
    if (i % totalColumns === criticalColIndex) {
      let critical = cell.children[0].data || "";
      result[result.length - 1].critical = parseInt(
        critical.trim().replace(/,/g, "") || "0",
        10
      );
    }
  }
  db.set("countries", result);
  console.log("Countries Updated");
  setTimeout(getCountries, 5 * 60 * 1000); // 5 mins
}

async function getNews() {
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
  console.log("News Updated");
  setTimeout(getNews, 3 * 3600 * 1000); // 3 hours
}

getWorld();
getCountries();
getNews();

const listener = app.listen(5001, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

app.use(cors());

app.get("/", async function(req, res) {
  const [world, countries, news] = await Promise.all([
    db.fetch("world"),
    db.fetch("countries"),
    db.fetch("news")
  ]);
  res.json({
    world,
    countries,
    news
  });
});

app.get("/world/", async function(req, res) {
  const world = await db.fetch("world");
  res.json(world);
});

app.get("/countries/", async function(req, res) {
  const countries = await db.fetch("countries");
  res.json(countries);
});

app.get("/news/", async function(req, res) {
  const news = await db.fetch("news");
  res.json(news);
});
